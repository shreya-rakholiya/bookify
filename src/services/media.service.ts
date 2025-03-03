import { FilterQuery } from "mongoose";
import { Imedia } from "../types/model.types";
import { mediaModel } from "../models/image";

export const addMedia=async(input:FilterQuery<Imedia>)=>{
    try{
        const media=await mediaModel.create(input);
        return media;
    }catch(err){
        console.error("Error while adding image data",err);
    }
}
