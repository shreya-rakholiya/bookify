import { Types } from "mongoose";
import { bookModel } from "../models/book";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { purchaseModel } from "../models/purchase";
import { getSubscriptionPlanById, getUserActiveSubscription } from "./subscription.service";
import { updateBookAvailibility } from "./book.service";
import { userModel } from "../models/user";
import { ObjectId } from "mongoose";

// export const initiatePurchase = async(userId:Types.ObjectId,
//     bookId:Types.ObjectId,
//     quantity:number
// )=>{
//     console.log(bookId);
    
//     const book=await bookModel.findById(bookId);
//     console.log(book,"boookkkk");
    
//     if(!book || book.copiesAvailable<quantity) {
//         throw new Error('Insufficient copies available');
//     }

//     const totalAmount=book.price * quantity;
//     console.log(totalAmount,"amount");
    
//     const razorpayOrderId=await createRazorpayOrder(totalAmount)
//     console.log(razorpayOrderId,"razor");
    
//     const order=await orderModel.create({
//         user:userId,
//         book:bookId,
//         amount: totalAmount,
//         paymentType: 'purchase',
//         razorpayOrderId
//     })
//     console.log(order,"order");
    
//     const purchase=await purchaseModel.create({
//         user:userId,
//         book:bookId,
//         orderId: order._id,
//         quantity,
//         totalAmount
//     })

//     return {order,purchase};
// }

export const initiatePurchase = async(userId:ObjectId,
    bookId:Types.ObjectId,
    quantity:number
)=>{
    console.log(bookId);
    
    const book=await bookModel.findById(bookId);
    console.log(book,"boookkkk");
    
    if(!book || book.copiesAvailable<quantity) {
        throw new Error('Insufficient copies available');
    }

    //Check if user has active subscription
    const activeSubscription:any=await getUserActiveSubscription(userId)

    
    let totalAmount=book.price * quantity;
    let freeBookUsed=false;

    //Apply subscription discount if applicable
    if(activeSubscription){
        const plan=await getSubscriptionPlanById(activeSubscription.planId)
        if(plan){
            //check for free books benefits
            const userPurchase=await purchaseModel.countDocuments({
                user:userId,
                status:'completed',
                createdAt:{$gte:activeSubscription.startDate}
            })
            if(userPurchase<plan.benefit.freeBook && quantity===1){
                //Apply free book benefit
                totalAmount=0;
                freeBookUsed=true
            }else{
                //Apply discount percentage
                const discount=(totalAmount* plan.benefit.discountPercent)/100;
                totalAmount-=discount
            }
        }
    }

    //If the book is free due to subscription,skip payment process 
    console.log(totalAmount,"amount");
    
    let order,razorpayOrderId;
    if(totalAmount>0){
        razorpayOrderId=await createRazorpayOrder(totalAmount)
        console.log(razorpayOrderId,"razor");
        order=await orderModel.create({
            user:userId,
            book:bookId,
            amount: totalAmount,
            paymentType: 'purchase',
            razorpayOrderId
        })
        console.log(order,"order");
    }else{
        order=await orderModel.create({
            user:userId,
            book:bookId,
            amount:totalAmount,
            paymentType:'purchase',
            razorpayOrderId:`free_${Date.now()}`,
            status:'completed'
        })
    }
    const purchase=await purchaseModel.create({
        user:userId,
        book:bookId,
        orderId: order._id,
        quantity,
        totalAmount,
        status:freeBookUsed?'completed':'pending'
    })
    //if free book , immediately update inventory and user's purchased books
    if(freeBookUsed){
        await updateBookAvailibility(bookId,-quantity);
        await userModel.findByIdAndUpdate(
            userId,
            {$push:{purchasedBooks:bookId}}
        )
    }

    return {order,purchase,freeBookUsed,requiresPayment:totalAmount>0};
}

