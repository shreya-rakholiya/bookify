import { Response } from "express";
import { Request } from "../../types/request";
import { findAllBlog } from "../../services/blog.service";

export const getAllBlogController=async(req:Request, res:Response)=>{
    try{
        const blog = await findAllBlog();
        if(!blog){
            return res.status(404).json({success: false,message:"there is no blog"})
        }
        return res.status(200).json({success: true,message: "All Blogs",data: blog})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}
