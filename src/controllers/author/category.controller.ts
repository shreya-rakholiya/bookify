import { Response } from "express";
import { findAllCategory } from "../../services/category.service";
import { Request } from "../../types/request";

export const getAllBookCategory=async(req:Request,res:Response):Promise<any>=>{
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
