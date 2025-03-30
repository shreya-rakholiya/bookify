import { Response } from "express";
import { Request } from "../../types/request";

export const initiateFineController=async(req:Request,res:Response)=>{
    try{
        const authuserId=req.authuserId
        const {borrowId}=req.body;
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}