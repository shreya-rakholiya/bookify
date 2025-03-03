import { Response } from "express";
import { createReview, deleteReview, findAllReviews } from "../../services/review.service";
import { Request } from "../../types/request";

export const createReviewController = async (req:Request, res:Response) => {
  try {
    const userId=req.authuserId;
    const payload = req.body;
    if (!payload) {
      return res
        .status(400)
        .json({ message: "Please enter a valid review", success: false });
    }
    const review = await createReview({...payload,uesr:userId});
    return res.status(201).json({
      success: true,
      message: "create successfully",
      data:review,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const deleteReviewController = async (req:Request, res:Response) => {
  try {
        const {rId}=req.params;

        const review=await deleteReview({_id:rId});

        if(!review) {
            return res.status(404).json({message:"review not found",status:false});
        }

        return res.status(200).json({message:"review successfully deleted",status:true  });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
};

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