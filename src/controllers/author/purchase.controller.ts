import { Response } from "express";
import { Request } from "../../types/request";
import { error } from "console";
import { findAllPurchase } from "../../services/purchase.service";

export const purchaseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const purchase = await findAllPurchase();
    if(!purchase.length){
        return res.status(404).json({
          success: false,
          message: "No purchase found",
        });  // No purchase found in the database.
    }
    return res.status(200).json({
      success: true,
      data: purchase,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to load purchase data",
      error: err.message,
    });
  }
};
