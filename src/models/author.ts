import { model, Schema, Types } from "mongoose";
import { Iauthor } from "../types/model.types";

const { ref, required } = require("joi");

const authorSchema=new Schema<Iauthor>({
    name:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:""
    },
    image:{
        type:Types.ObjectId,
        ref:"media",
        required:false
    }
},{timestamps:true});

export const authorModel=model<Iauthor>("Author",authorSchema);
