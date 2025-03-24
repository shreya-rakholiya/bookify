import { Response } from "express";
import { Request } from "../../types/request";
import { createBlogDetail, getBlogDetailById } from "../../services/blogDetail.service";
import test from "node:test";




export const getBlogDetailController=async(req:Request,res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({
                success:false,
                message:"please provide blog id"
            })
        }
        const blog=await getBlogDetailById(bId)
        if(!blog){
            return res.status(404).json({
                success:false,
                message:"blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: blog
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message
        })
    }
}