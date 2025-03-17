import { Response } from "express";
import { Request } from "../../types/request";

export const getReviewsOfBookController=async(req:Request,res:Response)=>{
    try{
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}