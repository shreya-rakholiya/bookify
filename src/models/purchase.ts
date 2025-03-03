import { Schema ,Types,model} from "mongoose";
import { Ipurchase } from "../types/model.types";

const purchaseSchema=new Schema<Ipurchase>({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    book:{
        type:Types.ObjectId,
        ref:"Book",
        required:true
    },
    orderId:{
        type:Types.ObjectId,
        ref:"Order",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    purchaseDate:{
        type:Date,
        default:Date.now
    },
    totalAmount:{
        type:Number
    },
    status:{
        type:String,
        enum:['pending','completed','cncelled','refunded'],
         default: 'pending'
    }
},{timestamps:true},)


export const purchaseModel=model<Ipurchase>("Purchase",purchaseSchema);
