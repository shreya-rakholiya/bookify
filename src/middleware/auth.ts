import { NextFunction, Response } from "express";
import { findUser } from "../services/user.service";
import Jwt from "jsonwebtoken"
import { Request } from "../types/request";
import { ObjectId } from "mongoose";

// require("dotenv").config();

export const validateAuthIdToken = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    res.status(403).json({ message: "Unauthorized request." });
    return;
  }
  const decode = Jwt.verify(token, process.env.JWT_SECRET || "secret");
  // @ts-ignore
  let userId = decode.id;
  console.log(decode,"decode");
  

  console.log(userId,"geirigokoperjoig");
  

  if (!userId) {
    res.status(403).json({ message: "Unauthorized request." });
    return;
  }

  const userData = await findUser({ _id: userId });

  // console.log(userData, "userData");
  // @ts-ignore
  const { password, ...otherData } = userData;
  // console.log(password,"pwd");
  // console.log(otherData,"otherr");
  
  // @ts-ignore
  req.authuserId=otherData._id;
  // @ts-ignore
  req.authUser = otherData;
  // console.log(req.authUser,"other data");
  
  req.isAdmin = otherData.role === "admin";
  req.isAuthor = otherData.role === "author";
  // console.log(req.isAdmin,"isadmin");
  
  next();
};

