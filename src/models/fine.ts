import { model, Schema, Types } from "mongoose";
import { Ifine } from "../types/model.types";

const fineSchema=new Schema<Ifine>({
    borrowId:{
        type:Types.ObjectId,
        ref:"Borrow",
        required:true,
    },
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    amount:{
        type:Number,
        default:0
    },
    orderId:{
        type:Types.ObjectId,
        ref:"Order",
        default:null
    },
    daysLate:{
        type:Number,
    },
    reason:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:['pending','paid'],
        default:"pending"
    }
})


export const fineModel=model<Ifine>("Fine",fineSchema);
