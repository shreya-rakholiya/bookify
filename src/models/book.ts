import { model, Schema, Types } from "mongoose";
import { Ibook } from "../types/model.types";

const mongoose = require("mongoose");

const bookSchema = new Schema<Ibook>({
  title: {
    type: String,
    required: true,
  },
  image:{
    // type:Types.ObjectId,
    // ref:"Media"
    type:String
  },
  author: {
    type: String,
    // ref: "Author",
    default:""
  },
  isbn: {
    type: Number,
    lenght: 13,
  },
  category: {
    type:String,
    // ref:"Category",
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