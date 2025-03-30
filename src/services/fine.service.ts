import { FilterQuery, ObjectId, Types } from "mongoose";
import { borrowModel } from "../models/borrow";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { fineModel } from "../models/fine";
import { Ifine } from "../types/model.types";
import { create } from "domain";

export const calculateFine = async (
  borrowId: Types.ObjectId,
  daysLate: number
) => {
  const borrow = await borrowModel.findById(borrowId);
  if (!borrow) {
    throw new Error("Borrow record not found");
  }
  const fineAmount = daysLate * 20; //20 rupees per day
  const razorpayOrderId = await createRazorpayOrder(fineAmount);

  const order = await orderModel.create({
    userId: borrow.userId,
    borrowId: borrow._id,
    amount: fineAmount,
    paymentType: "fine",
    razorpayOrderId,
  });

  const fine = await fineModel.create({
    borrowId: borrow._id,
    userId: borrow.userId,
    amount: fineAmount,
    daysLate,
    orderId: order._id,
  });
  return { fine, order };
};


export const initiateFine=async(
  userId: string,
  borrowId: ObjectId,
)=>{
  const fine=await findFine(borrowId);
  if(!fine){
    throw new Error("Fine record not found");
  }
  const razorpayOrderId=await createRazorpayOrder(fine.amount)

  const order=await orderModel.create({
    userId,
    borrowId,
    amount: fine.amount,
    paymentType: "fine",
    razorpayOrderId,
  })

  const fineRecord =await fineModel.updateOne({_id:fine._id},{
    orderId:order._id,
  })

  return {fine: fineRecord,order};
}

export const createFine = async (input: FilterQuery<Ifine>) => {
  const fine = await fineModel.create(input);
  return fine;
};

export const updatefine = async (
  query: FilterQuery<Ifine>,
  update: Partial<Ifine>
) => {
  const fine = await fineModel.updateOne(query, update, { new: true });
  return fine;
};

export const getFine = async (userId: ObjectId) => {
  const fines = await fineModel.find({ user: userId }).populate({
    path: "borrowId",
    populate: {
      path: "bookId",
    },
  });
  return fines;
};

export const findFine=async(bId:ObjectId)=>{
  console.log(bId);
  const fine=await fineModel.findOne({borrowId:bId});
  console.log(fine);
  return fine;
}