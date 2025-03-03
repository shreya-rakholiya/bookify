import { model, Schema } from "mongoose";
import { Icontact } from "../types/model.types";

const conatctSchema=new Schema<Icontact>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    subject:{
        type:String,
        default:""
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const contactModel=model<Icontact>("Contact",conatctSchema);
