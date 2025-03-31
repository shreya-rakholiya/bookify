import { NextFunction, Response } from "express";
import { Request } from "../types/request";

export const validateAuthor=async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
    if (!req.isAuthor) {
        return res.status(403).json({ message: "Unauthorized requests." })
      }
      next();
}
