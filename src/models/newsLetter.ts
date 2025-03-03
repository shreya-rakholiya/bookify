import { model, Schema } from "mongoose";
import { InewsLetter } from "../types/model.types";

const newsLetterSchema=new Schema<InewsLetter>({
    email:{
        type:String,
        required:true
    },
    subscribedAt:{
        type:Date,
        default:Date.now
    }
})


export const newsLetterModel=model<InewsLetter>("NewsLetter",newsLetterSchema);
