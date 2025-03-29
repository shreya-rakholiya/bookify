import { model, Schema, Types } from "mongoose";
import { Iwishlist } from "../types/model.types";


const wishlistSchema=new Schema<Iwishlist>({
    user:{
        type:Types.ObjectId,
        required:true,
        ref:"User"
    },
    book:{
        type:Types.ObjectId,
        ref:"Book",
        required:true,
    },
    addedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})


export const wishlistModel=model("Wishlist",wishlistSchema);


