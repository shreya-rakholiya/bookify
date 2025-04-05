import { Response } from "express";
import { Request } from "../../types/request";
import { createBook, deleteBook, findAllBook, findBook, getBookByAuthor, updateBook } from "../../services/book.service";
import { addMedia } from "../../services/media.service";

export const uploadBookImage=async(req:Request, res:Response)=>{
    try{
        const file = req.body.files;
        console.log(file[0].path,"fileeee");
        
        if (!file || !file[0].path) {
            return res.status(400).json({ error: "No file uploaded or invalid file" });
          }
          const bookImage=await addMedia({title:"",url:file[0].path,type:"book"})
          console.log(bookImage,"imaeggegruhewuih");
          
          return res.status(201).json({ success: true, message: "Book Image uploaded successfully",data: bookImage})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error",err:(err as Error).message})
    }
}

export const createBookController= async(req:Request,res:Response)=>{
    try{
        const payload=req.body;
        const authUserId=req.authuserId

        if(!payload){
            return res.status(400).json({success: false,message: "Please enter book details"})
        }

        const book=await createBook({...payload,author:authUserId,copiesAvailable:payload.totalCopies});
        return res.status(201).json({success: true,message: "Book Create successfully",data: book})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const getAllBookController=async(req:Request,res:Response)=>{
    try{
        const authUserId=req.authuserId;
        if(!authUserId){
            return res.status(403).json({
                success:false,
                message:"Auth user not found"
            })
        }
        const book=await getBookByAuthor(authUserId);

        // @ts-ignore
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
        const bId=req.query.bId;
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

export const deleteBookController=async(req:Request, res:Response)=>{
    try{
        const {bId}=req.params;
        console.log(bId);
        
        if(!bId){
            return res.status(400).json({success: false,message: "Please provide book id"})
        }
        const book=await deleteBook(bId)

        return res.status(200).json({success:true,message:"Book deleted successfully",data:book})
    }catch(err){
        res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const updateBookController=async(req:Request, res:Response)=>{
    try{
        const {bId}=req.params;
        console.log(bId);
        
        const payload=req.body;
        if(!bId ||!payload){
            return res.status(400).json({success: false,message: "Please provide book id and book details"})
        }
        const book=await updateBook({_id:bId},payload);

        return res.status(200).json({success: true,message: "Book updated successfully",data: book})
    }catch(err){
        return res.status(500).json({success: false,message: "Internal Server Error"});
    }
}