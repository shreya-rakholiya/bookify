import { Response } from "express";
import { Request } from "../../types/request";
import { addMedia } from "../../services/media.service";
import { createBlog, deleteBlog, findAllBlog, findBlog, updateBlog } from "../../services/blog.service";

export const uploadBlogImage=async(req:Request, res:Response)=>{
    try{
        const file = req.body.files;
        console.log(file[0].path,"fileeee");
        
        if (!file || !file[0].path) {
            return res.status(400).json({ error: "No file uploaded or invalid file" });
          }
          const bookImage=await addMedia({title:"",url:file[0].path,type:"blog"})
          console.log(bookImage);
          
          return res.status(201).json({ success: true, message: "Blog Image uploaded successfully",data: bookImage})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const createBlogController=async (req: Request, res: Response)=>{
    try{
        const payload=req.body;
        if(!payload){
            return res.status(400).json({
                success:false,
                message:"Please provide blog details"
            })
        }
        const blog=await createBlog(payload);
        return res.status(201).json({success: true,message: "Blog Create successfully",data: blog})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

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

export const  getBlogController=async(req:Request, res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({success: false,message: "Please provide blog id"})
        }
        const blog=await findBlog(bId);
        if(!blog){
            return res.status(404).json({success: false,message:"Blog not found"})
        }
        return res.status(200).json({success: true,message: "Blog fetched successfully",data: blog})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const updateBlogController =async (req:Request, res:Response) =>{
    try{
        const {bId} = req.params;
        const payload=req.body;
        if(!bId || !payload){
            return res.status(400).json({
                success:false,
                message:"Please provide book id and book details"
            })
        }
        const blog=await updateBlog({_id:bId},payload);
        return res.status(200).json({success: true,message: "Blog updated successfully",data: blog})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const deleteBlogController = async(req:Request,res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({success: false,message: "Please provide book id"})
        }
        const blog=await deleteBlog(bId);
        return res.status(200).json({success: true,message: "Blog deleted successfully",data: blog})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}