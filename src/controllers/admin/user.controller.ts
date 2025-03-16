import { Response } from "express";
import { Request } from "../../types/request";
import { findAllUser } from "../../services/user.service";

export const getAlluserController = async (req: Request, res: Response) => {
  try {
    const user = await findAllUser();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user Found`,
      });
    }
    return res.status(200).json({
         success: true ,
         message:`User Fetched successfully`,
         data:user
        });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch user`,
      error: err.message,
    });
  }
};
