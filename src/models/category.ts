import { model, Schema } from "mongoose";
import { Icategory } from "../types/model.types";

const categorySchema=new Schema<Icategory>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
},{timestamps:true})


export const categoryModel=model<Icategory>("Category",categorySchema);
