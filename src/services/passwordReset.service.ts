import { FilterQuery } from "mongoose";
import { passwordResetModel } from "../models/passwordReset"
import { IpasswordReset } from "../types/model.types";

export const deletePreviousPasswordReset=(uid:string)=>{
    const passwordReset=passwordResetModel.deleteMany({user:uid});
    return passwordReset;
}

export const createPasswordReset=(input:FilterQuery<IpasswordReset>)=>{
    const passwordReset=passwordResetModel.create(input);
    return passwordReset;
}

export const findPasswordResetByToken=(token:string)=>{
    const passwordReset=passwordResetModel.findOne({token});
    return passwordReset;
}