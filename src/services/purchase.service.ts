import { Types } from "mongoose";
import { bookModel } from "../models/book";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { purchaseModel } from "../models/purchase";

export const initiatePurchase = async(userId:Types.ObjectId,
    bookId:Types.ObjectId,
    quantity:number
)=>{
    console.log(bookId);
    
    const book=await bookModel.findById(bookId);
    console.log(book,"boookkkk");
    
    if(!book || book.copiesAvailable<quantity) {
        throw new Error('Insufficient copies available');
    }

    const totalAmount=book.price * quantity;
    console.log(totalAmount,"amount");
    
    const razorpayOrderId=await createRazorpayOrder(totalAmount)
    console.log(razorpayOrderId,"razor");
    
    const order=await orderModel.create({
        user:userId,
        book:bookId,
        amount: totalAmount,
        paymentType: 'purchase',
        razorpayOrderId
    })
    console.log(order,"order");
    
    const purchase=await purchaseModel.create({
        user:userId,
        book:bookId,
        orderId: order._id,
        quantity,
        totalAmount
    })

    return {order,purchase};
}

