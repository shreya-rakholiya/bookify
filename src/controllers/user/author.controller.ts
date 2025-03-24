import {Response } from "express";
import { findAllAuthor, findAuthor } from "../../services/author.service";
import { Request } from "../../types/request";



export const findAuthorController=async(req:Request, res:Response)=>{
    try{
        // const {id}=req.params;
        //@ts-ignore
        const author=await findAllAuthor();

        if(!author){
            return res.status(404).json({
                success:false,
                message:"no Author Found"
            })
        }
        
        return res.status(200).json({
            success:true,
            data:author
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:(err as Error).message
        })
    }
}

