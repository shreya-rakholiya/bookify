import { model, Schema, Types } from "mongoose";
import { Ibook } from "../types/model.types";

const mongoose = require("mongoose");

const bookSchema = new Schema<Ibook>({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:Types.ObjectId,
    ref:"Media"
  },
  author: {
    type:Types.ObjectId,
    ref:"User",
    default:""
  },
  isbn: {
    type: Number,
    lenght: 13,
  },
  category: {
    type:Types.ObjectId,
    ref:"Category",
    default:null
  },
  price: {
    type: Number,
  },
  publishedYear: {
    type: Number,
  },
  publisher: {
    type: String,
    default:""
  },
  description: {
    type: String,
    default: "",
  },
  totalCopies: {
    type: Number,
    default: 0,
  },
  copiesAvailable: {
    type: Number,
    default:0
  }

},{timestamps:true});


export const bookModel=model<Ibook>("Book",bookSchema);