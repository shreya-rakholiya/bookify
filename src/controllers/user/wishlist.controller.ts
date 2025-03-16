import { Response } from "express";
import { Request } from "../../types/request";
import { createwishlist, deletewishlist, findWishlistByuserId } from "../../services/wishlist.service";

export const createWishlistController=async(req:Request,res:Response)=>{
    try{
        const payload=req.body;
        if(!payload){
            return res.status(400).json({
                success: false,
                message: "Please enter wishlist data",
            })
        }
        const wishlist=await createwishlist(payload);
        return res.status(201).json({
            success: true,
            message: "Wishlist created successfully",
            data: wishlist,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            essage:err.message})
    }
}

export const deletewishlistItemController=async(req:Request,res:Response)=>{
    try{
        const {wId}=req.params;
        if(!wId){
            return res.status(400).json({
                success: false,
                message: "Please provide wishlist id",
            })
        }
        const wishlistItem=await deletewishlist(wId);
        if(!wishlistItem){
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Wishlist item deleted successfully",
            data: wishlistItem,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message})
    }
}


export const getUserWishlistController=async(req:Request,res:Response)=>{
    try{
        const {uId}=req.params;
        if(!uId){
            return res.status(400).json({
                success: false,
                message: "Please provide user id",
            })
        }
        const wishlist=await findWishlistByuserId(uId);
        if(!wishlist){
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "Wishlist found successfully",
            data: wishlist,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message})
    }
}