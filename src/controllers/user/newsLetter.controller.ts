import {Response } from "express";
import Joi from "joi";
import { createNewsLetter } from "../../services/newsLetter.service";
import { Request } from "../../types/request";


const newsLetterVAlidate=Joi.object({
    email:Joi.string().required(),
})

export const  createNewsLetterController=async(req:Request, res:Response)=>{
    try{
        const payload = await newsLetterVAlidate.validateAsync(req.body);

        if(!payload){
            return res.status(400).json({
                success:false,
                message:"please enter email"
            })
        }
    
        const newsLetter = await createNewsLetter(payload);
        return res.status(201).json({
          success: true,
          msg: "Successfull",
          data:newsLetter,
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            message:(err as Error).message
        })
    }
}
