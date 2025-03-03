import { model, Schema, Types } from "mongoose";
import { Iorder } from "../types/model.types";

const orderSchema=new Schema<Iorder>({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true,        
    },
    book:{
        type:Types.ObjectId,    
        ref:"Book"
    },
    borrowId:{
        type:Types.ObjectId,
        ref:"Borrow"
    },
    fineId:{
        type:Types.ObjectId,
        ref:"Fine"
    },
    purchaseId:{
        type:Types.ObjectId,
        ref:"Purchase"
    },
    amount:{
        type:Number,
        required:true,
    }, 
    paymentType:{
        type:String,
        enum:['purchase','deposit','fine'],
        required:true,
    },
    razorpayOrderId:{
        type:String,
    },
    razorpayPaymentId:{
        type:String,
    },
    status:{
        type:String,
        enum:['pending','completed','failed','refunded'],
        default:'pending'
    }
})


export const orderModel=model<Iorder>("Order",orderSchema);
