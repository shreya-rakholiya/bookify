import { model, Schema } from "mongoose";
import { Imedia } from "../types/model.types";

const mediaSchema = new Schema<Imedia>(
  {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },type:{
      type:String,
      default:"other",
    }
  },
  { timestamps: true }
);


export const mediaModel=model<Imedia>("Media",mediaSchema)
