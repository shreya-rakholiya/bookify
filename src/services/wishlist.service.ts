import { FilterQuery } from "mongoose";
import { Iwishlist } from "../types/model.types";
import { wishlistModel } from "../models/wishlist";
import { book } from "../routers/user/book.route";

export const createwishlist=async(input:Iwishlist)=>{
    const wishlist=await wishlistModel.create(input);
    return wishlist;
}

export const findWishlistByuserId=async(userId:string)=>{
    const wishlists=await wishlistModel.find({user:userId})
    .populate({
        path:'book',
        populate:{
            path:'author category image'
        }
    });
    return wishlists;
}

export const deletewishlist=async(id:string)=>{
    const wishlist=await wishlistModel.findByIdAndDelete({_id:id});
    return wishlist;
}