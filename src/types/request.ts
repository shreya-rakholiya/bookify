import { Request as expresesRequest } from "express";
import { Iuser } from "./model.types";

export interface Request extends expresesRequest {
  authUser?:Iuser ;
  authuserId?: string;
  isAdmin: boolean;
  files?:
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[];
}

