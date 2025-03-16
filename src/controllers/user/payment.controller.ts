import { Response } from "express";
import { Request } from "../../types/request";
import { processPayment } from "../../services/payment.service";
import { Types } from "mongoose";

export const verifyPaymentController=async(req:Request,res:Response)=>{
    try{
        const {orderId,razorayPaymentId}=req.body;
        console.log(orderId,"dhfuygfiu",razorayPaymentId);
        
        const result=await processPayment(orderId,razorayPaymentId)
        console.log(result,"resulttt");
        
        return res.status(200).json({success:true,data:result})
    }catch(err){
        res.status(400).json({success:false, error: (err as Error).message });
    }
}