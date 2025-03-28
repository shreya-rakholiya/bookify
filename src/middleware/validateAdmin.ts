import { NextFunction, Response } from "express";
import { Request } from "../types/request";

export const validateAdmin=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    if (!req.isAdmin) {
        return res.status(403).json({ message: "Unauthorized requests." })
      }
      next();
}
