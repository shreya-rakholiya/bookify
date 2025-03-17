import { ObjectId, Types } from "mongoose";
import { bookModel } from "../models/book";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { borrowModel } from "../models/borrow";
import { updateBookAvailibility } from "./book.service";
import { calculateFine } from "./fine.service";
import { processDepositeRefund } from "./payment.service";
import { getUserActiveSubscription } from "./subscription.service";
import { subscriptionPlanModel } from "../models/subscriptionPlan";

// export const initiateBorrow=async(userId:Types.ObjectId,
//     bookId:Types.ObjectId,
//     depositAmount:number=500)=>{
//     const book=await bookModel.findById(bookId);
//     if(!book || book.copiesAvailable<=0){
//         throw new Error('Book not available')
//     }

//     const razorpayOrderId=await createRazorpayOrder(depositAmount)
//     // console.log(razorpayOrderId,"rrazorpayOrderId");

//     const order = await orderModel.create({
//         user:userId,
//         book:bookId,
//         amount: depositAmount,
//         paymentType: 'deposit',
//         razorpayOrderId
//       });

//       const borrow=await borrowModel.create({
//         userId,
//         bookId,
//         orderId:order._id,
//         depositeAmount:depositAmount,
//         borrowDate:new Date(),
//         dueDate:new Date(Date.now()+14*24*60*60*1000),//14 days
//       })
//     //   console.log(borrow,"borrowwww");

//       return {order,borrow}
// }

export const initiateBorrow = async (
  userId: ObjectId,
  bookId: Types.ObjectId,
  depositAmount: number = 500
) => {
  const activeSubscription:any = await getUserActiveSubscription(userId);
  const book = await bookModel.findById(bookId);
  if (!book || book.copiesAvailable <= 0) {
    throw new Error("Book not available");
  }

  //Apply subscription discount to deposit if applicable

  let finalDepositAmount=depositAmount;

  if(activeSubscription){
    const plan=await subscriptionPlanModel.findById(activeSubscription.planId);
    if(plan?.benefit.dipositDiscountPercent){
      const discount=(depositAmount*plan.benefit.dipositDiscountPercent)/100;
      finalDepositAmount=depositAmount-discount
    }
  }

  const razorpayOrderId = await createRazorpayOrder(depositAmount);
  // console.log(razorpayOrderId,"rrazorpayOrderId");

  const order = await orderModel.create({
    user: userId,
    book: bookId,
    amount: depositAmount,
    paymentType: "deposit",
    razorpayOrderId,
  });

  const borrow = await borrowModel.create({
    userId,
    bookId,
    orderId: order._id,
    depositeAmount: depositAmount,
    borrowDate: new Date(),
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), //14 days
  });

  console.log(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),"due date");
  
  //   console.log(borrow,"borrowwww");

  return { order, borrow };
};

export const returnBook = async (borrowId: any) => {
  console.log(borrowId, "borrow service");
  const borrow = await borrowModel.findById(borrowId);
  console.log(borrow, "borroww skdjeis");
  if (!borrow) {
    throw new Error("Borrow record not found");
  }
  const daysLate =
    Math.ceil(Date.now() - borrow?.dueDate.getTime()) / (1000 * 60 * 60 * 24);

  borrow.returnDate = new Date();
  borrow.status = "returned";
  await borrow.save();
// @ts-ignore
  await updateBookAvailibility(borrow?.bookId, 1);
  await processDepositeRefund(borrow);

  if (daysLate > 0) {
    return calculateFine(borrowId, daysLate);
  }
};
