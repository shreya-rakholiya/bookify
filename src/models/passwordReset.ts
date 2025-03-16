import { model, Schema, Types } from "mongoose";
import { IpasswordReset } from "../types/model.types";



const passwordResetSchema=new Schema<IpasswordReset>({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})


export const passwordResetModel=model<IpasswordReset>("PasswordReset",passwordResetSchema)
