import { model, Schema, Types } from "mongoose";
import { Ireview } from "../types/model.types";
import { required } from "joi";


const reviewSchema=new Schema<Ireview>({
    user:{
        type:Types.ObjectId,
        ref:"Register",
        required:true
    },
    bookId:{
        type:Types.ObjectId,
        ref:"Book",
        required:true
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const reviewModel=model<Ireview>("Review",reviewSchema);
