import { model, Schema, Types } from "mongoose";
import { Iblog } from "../types/model.types";


const blogSchema = new Schema<Iblog>(
  {
    title: {
      type: String,
      required: true,
    },
    image:{
      type:Schema.ObjectId,
      ref:"Media",
      // default:""
      required:false
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    blogDetail: {
      // type: Types.ObjectId,
      // ref: "BlogDetail",
      type:String
    },
  },
  { timestamps: true }
);

export const blogModel=model<Iblog>("Blog",blogSchema);