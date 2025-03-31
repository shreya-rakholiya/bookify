import { Response } from "express";
import { Request } from "../../types/request";
import { countBook, countBookOfAuthor } from "../../services/book.service";

export const totalBookController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const authuserId=req.authuserId
        const totalBook=await countBookOfAuthor(authuserId);
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