import { model, Schema, Types } from "mongoose";
import { Iuser } from "../types/model.types";
import { required } from "joi";

const userSchema = new Schema<Iuser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile:{
      type: Types.ObjectId,
      ref: "Media"
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "author", "user"],
    },
    gender: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    borrowedBooks: [{ type: Types.ObjectId, ref: "Borrow" }],
    purchasedBooks: [{ type: Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true }
);

export const userModel = model<Iuser>("User", userSchema);
