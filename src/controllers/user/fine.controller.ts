import { Response } from "express";
import { Request } from "../../types/request";
import { initiateFine } from "../../services/fine.service";

export const initiateFineController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const authuserId=req.authuserId.toString()
        const {borrowId}=req.body;
        console.log(borrowId,"borrowId");
        
        const result=await initiateFine(authuserId,borrowId);
        console.log(result,"result");
        
        return res.status(200).json({
            success:true,
            message:'fine paid successfully',
            data:result
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}