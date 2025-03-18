import { FilterQuery } from "mongoose";
import { IborrowStatusTrackModel } from "../types/model.types";
import { borrowStatusTrackModel } from "../models/borrowStatusTrack.model";

export const createBorrowStatusTrack=async(input:FilterQuery<IborrowStatusTrackModel>)=>{
    const borrowStatusTrack=await borrowStatusTrackModel.create(input);
    return borrowStatusTrack;
}

export const findBorrowStatusTrack=async(query:FilterQuery<IborrowStatusTrackModel>)=>{
    const borrowStatusTrack=await borrowStatusTrackModel.find(query);
    return borrowStatusTrack;
}