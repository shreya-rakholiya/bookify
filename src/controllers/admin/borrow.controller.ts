import { Response } from "express";
import { Request } from "../../types/request";
import { error } from "console";
import { findAllBorrow } from "../../services/borrow.service";

export const borrowController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const borrow = await findAllBorrow();
    if(!borrow.length){
        return res.status(404).json({
          success: false,
          message: "No borrow found",
        });  // No borrow found in the database.
    }
    return res.status(200).json({
      success: true,
      data: borrow,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to load borrow data",
      error: err.message,
    });
  }
};
