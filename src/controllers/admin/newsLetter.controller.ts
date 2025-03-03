import {Response } from "express";
import {
  findAllNewsLetter,
  deleteNewsLetter,
} from "../../services/newsLetter.service";
import { Request } from "../../types/request";

export const getNewsLetterController = async (req:Request, res:Response) => {
  try {
    const newsLetter = await findAllNewsLetter();
    if (!newsLetter) {
      return res.status(404).json({
        success: false,
        message: "No newsletter found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "newsLetter Details",
      data: newsLetter,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

export const deleteNewsLetterController = async (req:Request, res:Response) => {
  try {
    const {nId}=req.params;
    if (!nId) {
      return res.status(400).json({
        success: false,
        message: "Enter newsletter details",
      });
    }

    const deletedNewsLetter = await deleteNewsLetter(nId);
    console.log(deletedNewsLetter);

    return res.status(200).json({
      success: true,
      message: "newsLetter Deleted successfully",
      deletedNewsLetter,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: (err as Error).message,
    });
  }
};

