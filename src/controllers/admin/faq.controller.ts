import { Response } from "express";
import {createFaq, deleteFaq, findAllfaq, updateFaq} from "../../services/faq.service";
import { Request } from "../../types/request";

export const createFaqController = async (req:Request, res:Response) => {
  try {
    const payload = req.body;

    if (!payload) {
      return res.status(400).json({
        success: false,
        message: "please enter faqs",
      });
    }

    const faq = await createFaq(payload);

    return res.status(201).json({
      success: true,
      message: "created",
      data: faq,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const getFaqController = async (req:Request, res:Response) => {
  try {
    const faqs = await findAllfaq();

    if (!faqs) {
      return res.status(404).json({
        success: false,
        message: "faqs not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "faqs",
      data: faqs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const deleteFaqController=async(req:Request,res:Response)=>{
  try{
    const {fId}=req.params;
    if(!fId){
      return res.status(400).json({
        success:false,
        message:"please provide faq id"
      });
    }
    const Faq=await deleteFaq(fId);
    return res.status(200).json({success:true, message:"Faq deleted successfully",data:Faq});
  }catch(err){
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
}

export const updateFaqController=async(req:Request,res:Response)=>{
  try{
 const {fId}=req.params;
        console.log(fId);
        
        const payload=req.body;
        if(!fId ||!payload){
            return res.status(400).json({success: false,message: "Please provide faq id and faq details"})
        }
        const book=await updateFaq({_id:fId},payload);

        return res.status(200).json({success: true,message: "faq updated successfully",data: book})
  }catch(err){
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
}


