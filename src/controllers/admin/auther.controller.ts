import {Response } from "express";
import { Request } from "../../types/request";


import Joi, { Err } from "joi"; 
import {
  createAuthor,
  deleteAuthor,
  updateAuthor,
  findAllAuthor,
} from "../../services/author.service"
import { addMedia } from "../../services/media.service";

const authorValidate = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().optional(),
  image: Joi.string().optional(),
})

export const uploadAuthorImage=async(req:Request, res:Response)=>{
    try{
        const file = req.body.files;
        console.log(file[0].path,"fileeee");
        
        if (!file || !file[0].path) {
            return res.status(400).json({ error: "No file uploaded or invalid file" });
          }
          const bookImage=await addMedia({title:"",url:file[0].path,type:"author"})
          console.log(bookImage);
          
          return res.status(201).json({ success: true, message: "Author Image uploaded successfully",data: bookImage})
    }catch(err){
        console.error(err);
        return res.status(500).json({success: false,message: "Internal Server Error"})
    }
}

export const createAuthorController = async (req:Request, res:Response) => {
  try {
    const payload = await authorValidate.validateAsync(req.body);

    if (!payload) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }
    const author = await createAuthor(payload);
    return res.status(201).json({
      sucess: true,
      data: author,
    });
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const deleteAuthorController = async (req:Request, res:Response) => {
  try {
    const {aId} = req.params;
    if (!aId) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }

    const deletedAuthor = await deleteAuthor({_id:aId});

    console.log(deletedAuthor);

    if (!deletedAuthor) {
      return res.status(404).json({
        success: false,
        msg: "Author not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedAuthor,
      message: "author deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const updateAuthorController = async (req:Request, res:Response) => {
  try {
    const {aId}=req.params;
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({
        success: false,
        msg: "enter author detail",
      });
    }
    const updatedAuthor = await updateAuthor({_id:aId},{...payload});

    if (!updatedAuthor) {
      return res.status(404).json({
        success: false,
        msg: "Author not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedAuthor,
      message: "author updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const getAllAuthorController=async(req:Request,res:Response)=>{
    try{
        const allAuthor=await findAllAuthor();

        if(!allAuthor){
            return res.status(404).json({
                success:false,
                message:"no author are found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Author Details",
            data:allAuthor
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:(err as Error).message
        })
    }
}

