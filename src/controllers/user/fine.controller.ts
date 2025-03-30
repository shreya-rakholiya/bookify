import { Response } from "express";
import { Request } from "../../types/request";
import { initiateFine } from "../../services/fine.service";

export const initiateFineController=async(req:Request,res:Response)=>{
    try{
        const authuserId=req.authuserId.toString()
        const {borrowId}=req.body;
        const result=await initiateFine(authuserId,borrowId);

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