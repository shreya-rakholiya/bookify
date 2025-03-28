import { Response } from "express";
import { Request } from "../../types/request";
import { countUserForSpecificRole } from "../../services/user.service";
import { countBook } from "../../services/book.service";
import { countPurchase } from "../../services/purchase.service";

export const totaluserController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const totalUSer=await countUserForSpecificRole('user');
        return res.status(200).json({
            success: true,
            totalUSer
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

export const totalAuthorController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const totalAuthor=await countUserForSpecificRole('author');
        return res.status(200).json({
            success: true,
            totalAuthor
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

export const totalBookController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const totalBook=await countBook();
        return res.status(200).json({
            success: true,
            totalBook
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

export const totalPurchaseController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const totalPurchase=await countPurchase();
        return res.status(200).json({
            success: true,
            totalPurchase
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}

