import {Response } from "express";
import { findAllfaq } from "../../services/faq.service";
import { Request } from "../../types/request";


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
      console.log(err);
      return res.status(500).json({
        success: false,
        message: (err as Error).message,
      });
    }
  }