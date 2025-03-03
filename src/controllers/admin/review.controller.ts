import {Response } from "express";
import { findAllReviews } from "../../services/review.service";
import { Request } from "../../types/request";


export const getAllReviews =async (req:Request, res:Response) => {
    try{
        const review=await findAllReviews();

        if(!review){
            return res.status(404).send({success: false,message:"there is no review"})
        }

        return res.status(200).json({success: true,message:"review fetched successfully",data:review})
    }catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message:(err as Error).message})
    }
}