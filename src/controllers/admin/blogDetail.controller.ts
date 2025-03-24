import { Response } from "express";
import { Request } from "../../types/request";
import { createBlogDetail, deleteBlogDetail, updateBlogDetail } from "../../services/blogDetail.service";

export const createBlogDetailController=async(req:Request,res:Response)=>{
    try{
        const payload=req.body;
        if(!payload){
            return res.status(400).json({
                success:false,
                message:"please enter valid data"
            })
        }
        const blog =await createBlogDetail(payload)
        return res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: blog
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message:err.message})
    }
}

export const deleteBlogDeatilController=async(req:Request,res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({
                success: false,
                message:"Please provide blog id"
            })
        }
        const blogDetail=await deleteBlogDetail(bId);
        if(!blogDetail){
            return res.status(404).json({
                success: false,
                message:"Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        })

    }catch(err){
        return res.status(500).json()
    }
}

export const updateBlogDetailController=async(req:Request, res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({
                success: false,
                message:"Please provide blog id"
            })
        }
        const updatedBlog=await updateBlogDetail({_id:bId},req.body);
        if(!updatedBlog){
            return res.status(404).json({
                success: false,
                message:"Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog
        })
    }catch (err) {
        return res.status(500).json({
            success: false,
            message: (err as Error).message,
        });
    }
}