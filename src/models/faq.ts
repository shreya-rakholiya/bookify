import { model, Schema } from "mongoose";
import { Ifaq } from "../types/model.types";

const faqSchema=new Schema<Ifaq>({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
},{timestamps:true})

export const faqModel=model<Ifaq>("Faq",faqSchema);
