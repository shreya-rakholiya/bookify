import { Response } from "express";
import { Request } from "../../types/request";
import { initiatePurchase } from "../../services/purchase.service";
import { Types } from "mongoose";
import { purchaseModel } from "../../models/purchase";

export const initiatePurchaseController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const {userId,bookId,quantity}=req.body;
        const result=await initiatePurchase(userId,bookId,
        quantity);
        console.log(result,"shreyaa");
        
        return res.status(200).json({success:true,message:"Purchase",data:result})
    }catch(err){
        console.log(err,"errrorrr");
        
        res.status(500).json({success:false,
            message:"Error during purchase",
            err
        })
    }
}

export const getPurchaseHistoryController=async(req:Request,res:Response)=>{
    try{
        const {userId}=req.params;
        const purchases=await purchaseModel.find({userId})
        .populate('book')
        .sort({purchaseDate:-1})
        res.status(200).json(purchases)
    }catch(err){
        return res.status(500).json({success:false,message:"Failed to get purchase history"});
    }
}