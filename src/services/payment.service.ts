import { Types } from "mongoose";
import { orderModel } from "../models/order";
import { verifyPayment } from "./razorpay.service";
import { purchaseModel } from "../models/purchase";
import { updateBookAvailibility } from "./book.service";
import { userModel } from "../models/user";
import { borrowModel } from "../models/borrow";
import { fineModel } from "../models/fine";
import { Iborrow } from "../types/model.types";
import { razorpay } from "../config/razorpay.config";
import { any } from "joi";

export const processPayment=async(
    orderId:Types.ObjectId,
    razorpayPaymentId:string    
)=>{
    const order=await orderModel.findById(orderId);
    if(!order){
        throw new Error ("Order not found")
    }
    // console.log(order.razorpayOrderId,"razorpay order id");
    // console.log(razorpayPaymentId,"razorpaypayment iddd");
    
    const isValid=await verifyPayment(order.razorpayOrderId,razorpayPaymentId);
    if(!isValid){
        throw new Error('Payment Verfication Failed')
    }

    order.razorpayPaymentId=razorpayPaymentId;
    order.status='completed';
    await order.save();

    switch(order.paymentType){
        case 'purchase':
            const purchase=await purchaseModel.findOneAndUpdate({orderId:order._id},
                {status:'completed'}
            )
            if(purchase){
                // @ts-ignore
                await updateBookAvailibility(purchase.book,-purchase.quantity)
                await userModel.findByIdAndUpdate(purchase.user,{$push:{purchasedBooks:purchase.book}})
            }
            break;
        
        case 'deposit':
            const borrow=await borrowModel.findOneAndUpdate({orderId:order._id},{status:'active'})
            console.log(borrow,"borrowww");
            
            if(borrow){
                // @ts-ignore
                await updateBookAvailibility(borrow.bookId,-1)
                console.log(updateBookAvailibility,"updated book");
               
                await userModel.findByIdAndUpdate(borrow.userId,{$push:{borrowedBooks:borrow._id}}) 
            }
            break;
        case 'fine':
            await fineModel.findOneAndUpdate({orderId:order._id},{status:'paid'});
            break;
    }
    return order;
}

export const processDepositeRefund=async(borrow:Iborrow)=>{
    const originalOrder=await orderModel.findById(borrow.orderId)
    console.log(originalOrder,"original order");
    
    if(!originalOrder?.razorpayPaymentId){
        throw new Error('original payment not found')
    }
    try{ 
        console.log("inititate refundd-------");
        
        //initiate refund throgh razorpay
        // const refund=await razorpay.payments.refund(originalOrder.razorpayPaymentId,{amount:borrow.depositeAmount * 100 //convert to paisa
        // })
        const payment = await razorpay.payments.fetch(originalOrder.razorpayPaymentId);
        console.log("Payment status:", payment.status);
        
        const refund = await razorpay.payments.refund(originalOrder.razorpayPaymentId, {
            amount: borrow.depositeAmount * 100, // convert to paise
            speed: 'normal', // You can use 'optimum' or 'normal'
            notes: {
              borrowId: borrow._id.toString(),
              reason: 'Book returned - deposit refund'
            }
          });
        console.log(refund,"amountt  refund process");
        
        //update borrow record
        borrow.depositeRefunded=true;
        await borrow.save();

        //create refund order record
        const refundOrder=await orderModel.create({
            userId:borrow.user,
            borrowId:borrow._id,
            amount:borrow.depositeAmount,
            paymentType:`refund_${Date.now()}`,status:'refunded'
        })
        return refundOrder;

    }catch(err){
        throw new Error('Refund processing failed')
    }
}
