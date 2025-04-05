import { Response } from "express";
import { Request } from "../../types/request";
import {
  findPurchaseHistory,
  initiatePurchase,
} from "../../services/purchase.service";
import { ObjectId, Types } from "mongoose";
import { purchaseModel } from "../../models/purchase";

export const initiatePurchaseController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const authuserId = req.authuserId as ObjectId;
    const { bookId, quantity } = req.body;
    const result = await initiatePurchase(authuserId, bookId, quantity);
    console.log(result, "shreyaa");

    return res
      .status(200)
      .json({ success: true, message: "Purchase", data: result });
  } catch (err) {
    console.log(err, "errrorrr");

    res
      .status(500)
      .json({ success: false, message: "Error during purchase", err });
  }
};

export const getPurchasedataController = async (
  req: Request,
  res: Response
) => {
  try {
    const authuserId=req.authuserId;
    const pId=req.params.pId;
    // @ts-ignore
    const purchases = await findPurchaseHistory(pId);
    res.status(200).json({ success: true, data: purchases });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to get purchase history" });
  }
};
