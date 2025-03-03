import { Types } from "mongoose";
import { borrowModel } from "../models/borrow";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { fineModel } from "../models/fine";

export const calculateFine=async(borrowId:Types.ObjectId,daysLate:number)=>{
    const borrow=await borrowModel.findById(borrowId);
    if(!borrow) {
        throw new Error('Borrow record not found');
    }
    const fineAmount=daysLate *20; //20 rupees per day
    const razorpayOrderId = await createRazorpayOrder(fineAmount);

    const order = await orderModel.create({
        userId: borrow.user,
        borrowId: borrow._id,
        amount: fineAmount,
        paymentType: 'fine',
        razorpayOrderId
      });

      const fine = await fineModel.create({
        borrowId: borrow._id,
        userId: borrow.user,
        amount: fineAmount,
        daysLate,
        orderId: order._id
      });
      return {fine,order}
}
