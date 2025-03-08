import { Response } from "express";
import { Request } from "../../types/request";
import { findAllBook, findBook } from "../../services/book.service";
import { bookModel } from "../../models/book";

export const getAllBookController=async(req:Request,res:Response)=>{
    try{
        const book=await findAllBook();

        if(!book){
            return res.status(404).send({success: false,message:"there is no book"})
        }

        return res.status(200).json({success: true,message:"books fetched successfully",data:book})

    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const getBookController=async(req:Request, res:Response)=>{
    try{
        const {bId}=req.params;
        if(!bId){
            return res.status(400).json({success: false,message: "Please provide book id"})
        }
        const book=await findBook(bId);

        if(!book){
            return res.status(404).json({
                success:false,
                message:"There is no book"
            })

        }

        return res.status(200).json({success: true,message:"book fetched successfully",data:book})

    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const getAvailableBooks=async(req:Request,res:Response)=>{
    try{
        const books=await bookModel.find({copiesAvailable:{$gt:0}})
        .populate('author')
        .populate('category')
        .lean()
        res.json(books);
    }catch(err){
        res.status(500).json({success: false,message:"Failed to fetch Books"})
    }
}