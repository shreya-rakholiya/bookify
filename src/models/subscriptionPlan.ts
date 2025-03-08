import { model, Schema } from "mongoose";
import { ISubscriptionPlan } from "../types/model.types";

const subscriptionPlanSchema=new Schema<ISubscriptionPlan>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    durationMonth:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    benefit:{
        freeBook:{type:Number,default:0},
        discountPercent:{type:Number,default:0},
        maxBorrowBooks:{type:Number,default:3},
        dipositDiscountPercent:{type:Number,default:0}
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

export const subscriptionPlanModel=model<ISubscriptionPlan>("SubscriptionPlan",subscriptionPlanSchema);