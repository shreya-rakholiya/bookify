import { model, Schema, Types } from "mongoose";
import { IborrowStatusTrackModel } from "../types/model.types";

const borrowStatusTrackSchema=new Schema<IborrowStatusTrackModel>({
    _id:{
        type:Types.ObjectId,
        ref:"Borrow"
    },
    expireAt:{
        type:Date,
        required:true
    }
})

export const borrowStatusTrackModel=model<IborrowStatusTrackModel>("BorrowStatusTrack",borrowStatusTrackSchema)