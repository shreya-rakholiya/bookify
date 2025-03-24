import { model, Schema } from "mongoose";
import { IblogDetail } from "../types/model.types";

const blogDetailSchema=new Schema<IblogDetail>({
    description: {
        type: String,
        required: false,
    }
    
})

export const blogDetailModel=model<IblogDetail>("BlogDetail",blogDetailSchema)