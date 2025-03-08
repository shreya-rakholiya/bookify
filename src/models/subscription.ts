import { model, Schema } from "mongoose";
import { Isubscription } from "../types/model.types";

const subscriptionSchema=new Schema<Isubscription>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    planId:{
        type:Schema.Types.ObjectId,
        ref:'SubscriptionPlan',
        required:true
    },
    startDate:{
        type:Date,
        default:Date.now
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:'active',
        enum:['active','cancelled','expired']
    },
    razorpaySubscriptionId:{
        type:String,
        required:true
    },
    autoRenew:{
        type:Boolean,
        default:true
    }
 },{timestamps:true})
export const subscriptionModel=model<Isubscription>('Subscription',subscriptionSchema)
