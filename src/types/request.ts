import { Request as expresesRequest } from "express";
import { Iuser } from "./model.types";
import { ObjectId } from "mongoose";

export interface Request extends expresesRequest {
  authUser?:Iuser ;
  authuserId?: ObjectId;
  isAdmin: boolean;
  files?:
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[];
}

