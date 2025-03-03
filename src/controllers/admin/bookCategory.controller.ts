import { Response } from "express";
import { Request } from "../../types/request";
import { createCategory, deleteCategory, findAllCategory,updateCategory } from "../../services/category.service";

export const createBookCategoryController=async (req:Request,res:Response) => {
    try{
        const payload =req.body;
        if(!payload){
            return res.status(400).json({success: false, message: "Please enter book category details"})
        }
        const bookCategory=await createCategory(payload);

        return res.status(201).json({success: true, message: "Book Category Create successfully",data: bookCategory})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const getAllBookCategory=async(req:Request,res:Response)=>{
    try{
        const category = await findAllCategory()

        if(!category){
            return res.status(404).send({success: false,message:"there is no book category"})
        }

        return res.status(200).json({success: true, message:"book categories fetched successfully",data: category})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const deleteBookCategory=async (req:Request,res:Response)=>{
    try{
        const {cId}=req.params;
        if(!cId){
            return res.status(400).json({success: false, message: "Please provide book category id"})
        }
        const category=await deleteCategory({_id:cId})

        return res.status(200).json({success: true, message:"Book category deleted successfully", data: category})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false, message: "Internal Server Error"})
    }
}

export const updateCategoryController=async(req:Request,res:Response)=>{
    try{
        const {cId}=req.params;
        const payload=req.body;
        if(!cId || !payload){
            return res.status(400).json({
                success:false,
                message:"Please provide book id and book details"
            })
        }
        const category=await updateCategory({_id:cId},payload)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}