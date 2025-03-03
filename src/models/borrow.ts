import { model } from "mongoose";
import { Schema, Types } from "mongoose";
import { Iborrow } from "../types/model.types";

const borrowSchema = new Schema<Iborrow>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "Register",
      required: true,
    },
    bookId: {
      type: Types.ObjectId,
      ref: "Book",
      required:true
    },
    orderId: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    depositeAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "returned", "overdue"],
      default: "pending",
    },
    depositeRefunded: {
      type: Boolean,
      default:false 
    },
  },
  { timestamps: true }
);

export const borrowModel = model<Iborrow>("Borrow", borrowSchema);
