import { FilterQuery, Types } from "mongoose";
import { bookModel } from "../models/book";
import { createRazorpayOrder } from "./razorpay.service";
import { orderModel } from "../models/order";
import { purchaseModel } from "../models/purchase";
import {
  getSubscriptionPlanById,
  getUserActiveSubscription,
} from "./subscription.service";
import { updateBookAvailibility } from "./book.service";
import { userModel } from "../models/user";
import { ObjectId } from "mongoose";
import { Ipurchase } from "../types/model.types";

// export const initiatePurchase = async(userId:Types.ObjectId,
//     bookId:Types.ObjectId,
//     quantity:number
// )=>{
//     console.log(bookId);

//     const book=await bookModel.findById(bookId);
//     console.log(book,"boookkkk");

//     if(!book || book.copiesAvailable<quantity) {
//         throw new Error('Insufficient copies available');
//     }

//     const totalAmount=book.price * quantity;
//     console.log(totalAmount,"amount");

//     const razorpayOrderId=await createRazorpayOrder(totalAmount)
//     console.log(razorpayOrderId,"razor");

//     const order=await orderModel.create({
//         user:userId,
//         book:bookId,
//         amount: totalAmount,
//         paymentType: 'purchase',
//         razorpayOrderId
//     })
//     console.log(order,"order");

//     const purchase=await purchaseModel.create({
//         user:userId,
//         book:bookId,
//         orderId: order._id,
//         quantity,
//         totalAmount
//     })

//     return {order,purchase};
// }

export const initiatePurchase = async (
  userId: ObjectId,
  bookId: Types.ObjectId,
  quantity: number
) => {
  console.log(bookId);

  const book = await bookModel.findById(bookId);
  console.log(book, "boookkkk");

  if (!book || book.copiesAvailable < quantity) {
    throw new Error("Insufficient copies available");
  }

  //Check if user has active subscription
  const activeSubscription: any = await getUserActiveSubscription(userId);

  let totalAmount = book.price * quantity;
  let freeBookUsed = false;

  //Apply subscription discount if applicable
  if (activeSubscription) {
    const plan = await getSubscriptionPlanById(activeSubscription.planId);
    if (plan) {
      //check for free books benefits
      const userPurchase = await purchaseModel.countDocuments({
        user: userId,
        status: "completed",
        createdAt: { $gte: activeSubscription.startDate },
      });
      if (userPurchase < plan.benefit.freeBook && quantity === 1) {
        //Apply free book benefit
        totalAmount = 0;
        freeBookUsed = true;
      } else {
        //Apply discount percentage
        const discount = (totalAmount * plan.benefit.discountPercent) / 100;
        totalAmount -= discount;
      }
    }
  }

  //If the book is free due to subscription,skip payment process
  console.log(totalAmount, "amount");
  const totalAmountInPaise = Math.round(totalAmount * 100);
  let order, razorpayOrderId;
  if (totalAmount > 0) {
    razorpayOrderId = await createRazorpayOrder(totalAmount);
    console.log(razorpayOrderId, "razor");
    order = await orderModel.create({
      user: userId,
      book: bookId,
      amount: totalAmount,
      paymentType: "purchase",
      razorpayOrderId,
    });
    console.log(order, "order");
  } else {
    order = await orderModel.create({
      user: userId,
      book: bookId,
      amount: totalAmount,
      paymentType: "purchase",
      razorpayOrderId: `free_${Date.now()}`,
      status: "completed",
    });
  }
  const purchase = await purchaseModel.create({
    user: userId,
    book: bookId,
    orderId: order._id,
    quantity,
    totalAmount,
    status: freeBookUsed ? "completed" : "pending",
  });
  //if free book , immediately update inventory and user's purchased books
  if (freeBookUsed) {
    await updateBookAvailibility(bookId, -quantity);
    await userModel.findByIdAndUpdate(userId, {
      $push: { purchasedBooks: bookId },
    });
  }

  
  return { order, purchase, freeBookUsed, requiresPayment: totalAmount > 0 };
};

export const countPurchase = async () => {
  const count = await purchaseModel.countDocuments();
  return count;
};


export const findPurchase=async(userId:ObjectId)=>{
  const purchases=await purchaseModel.find({user:userId})
  .populate('book');
  return purchases;
}

export const findPurchaseforAuthor=async(authorId:ObjectId)=>{
  const result = await userModel.aggregate([
    {
      $match: {
        _id: authorId,
        role: "author",
      },
    },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "author",
        as: "books",
      },
    },
    { $unwind: { path: "$books", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "purchases",
        localField: "books._id",
        foreignField: "book",
        as: "bookPurchases",
      },
    },
    { $unwind: { path: "$bookPurchases", preserveNullAndEmptyArrays: true } },
    {
      $match:{
        "bookPurchases.status": "completed",
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "bookPurchases.user",
        foreignField: "_id",
        as: "buyerDetails",
      },
    },
    { $unwind: { path: "$buyerDetails", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          bookId: "$books._id",
          purchaseId: "$bookPurchases._id",
        },
        bookId: { $first: "$books._id" },
        bookTitle: { $first: "$books.title" },
        purchase: {
          $first: {
            _id: "$bookPurchases._id",
            orderId: "$bookPurchases.orderId",
            quantity: "$bookPurchases.quantity",
            totalAmount: "$bookPurchases.totalAmount",
            status: "$bookPurchases.status",
            purchaseDate: "$bookPurchases.purchaseDate",
            user: {
              _id: "$buyerDetails._id",
              firstName: "$buyerDetails.firstName",
              lastName: "$buyerDetails.lastName",
              email: "$buyerDetails.email",
            },
          },
        },
      },
    },
    {
      $group: {
        _id: "$bookId",
        title: { $first: "$bookTitle" },
        purchases: { $push: "$purchase" },
      },
    },
    {
      $group: {
        _id: authorId,
        books: {
          $push: {
            _id: "$_id",
            title: "$title",
            purchases: "$purchases",
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    { $unwind: "$authorDetails" },
    {
      $project: {
        _id: 1,
        authorName: {
          $concat: [
            "$authorDetails.firstName",
            " ",
            "$authorDetails.lastName",
          ],
        },
        email: "$authorDetails.email",
        books: 1,
      },
    },
  ]);
  
  



  
  // const result = await userModel.aggregate([
  //   {
  //     $match: {
  //       _id: authorId,
  //       role: "author",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "books",
  //       localField: "_id",
  //       foreignField: "author",
  //       as: "books",
  //     },
  //   },
  //   { $unwind: { path: "$books", preserveNullAndEmptyArrays: true } },
    
  //   // Get purchases for this book
  //   {
  //     $lookup: {
  //       from: "purchases",
  //       localField: "books._id",
  //       foreignField: "book",
  //       as: "bookPurchases",
  //     },
  //   },
  //   { $unwind: { path: "$bookPurchases", preserveNullAndEmptyArrays: true } },
  
  //   // Get user details for each purchase
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "bookPurchases.user",
  //       foreignField: "_id",
  //       as: "buyerDetails",
  //     },
  //   },
  //   {
  //     $unwind: { path: "$buyerDetails", preserveNullAndEmptyArrays: true },
  //   },
  
  //   // Format each purchase with user details inside
  //   {
  //     $addFields: {
  //       "bookPurchases.user": "$buyerDetails",
  //     },
  //   },
  
  //   // Group purchases back by book
  //   {
  //     $group: {
  //       _id: "$books._id",
  //       title: { $first: "$books.title" },
  //       purchases: { $push: "$bookPurchases" },
  //     },
  //   },
  
  //   // Group books back by author
  //   {
  //     $group: {
  //       _id: authorId,
  //       books: {
  //         $push: {
  //           _id: "$_id",
  //           title: "$title",
  //           purchases: "$purchases",
  //         },
  //       },
  //     },
  //   },
  
  //   // Add author details
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "_id",
  //       foreignField: "_id",
  //       as: "authorDetails",
  //     },
  //   },
  //   { $unwind: "$authorDetails" },
  
  //   // Final projection
  //   {
  //     $project: {
  //       _id: 1,
  //       authorName: {
  //         $concat: ["$authorDetails.firstName", " ", "$authorDetails.lastName"],
  //       },
  //       email: "$authorDetails.email",
  //       books: 1,
  //     },
  //   },
  // ]);
  
  // const result = await userModel.aggregate([
  //   {
  //     $match: {
  //       _id:authorId,
  //       role: "author",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "books",
  //       localField: "_id",
  //       foreignField: "author",
  //       as: "books",
  //     },
  //   },
  //   { $unwind: { path: "$books", preserveNullAndEmptyArrays: true } },
  //   {
  //     $lookup: {
  //       from: "purchases",
  //       localField: "books._id",
  //       foreignField: "book",
  //       as: "purchases",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "purchases.user",
  //       foreignField: "_id",
  //       as: "buyers",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$books._id",
  //       bookTitle: { $first: "$books.title" },
  //       bookId: { $first: "$books._id" },
  //       purchases: { $first: "$purchases" },
  //       buyers: { $first: "$buyers" },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id:authorId,
  //       books: {
  //         $push: {
  //           _id: "$bookId",
  //           title: "$bookTitle",
  //           purchases: "$purchases",
  //           buyers: "$buyers",
  //         },
  //       },
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "_id",
  //       foreignField: "_id",
  //       as: "authorDetails",
  //     },
  //   },
  //   { $unwind: "$authorDetails" },
  //   {
  //     $project: {
  //       _id: 1,
  //       authorName: {
  //         $concat: ["$authorDetails.firstName", " ", "$authorDetails.lastName"],
  //       },
  //       email: "$authorDetails.email",
  //       books: 1,
  //     },
  //   },
  // ]);

  return result
}

export const findAllPurchase=async(   )=>{
  const purchase=await purchaseModel.find()
  .populate({path:'user',
    select:"firstName lastName email phone",
  })
  .populate({path:'book',
    select:"title",
    populate:{
      path:'author',
      select:"firstName lastName"
    }
  })
  .select("amount quantity purchaseDate")
  .lean()
  return purchase
}

export const findPurchaseHistory=async(pId:ObjectId)=>{
  const purchase=await purchaseModel.findOne({_id:pId})
  .populate({path:'user',
    select:"firstName lastName email phone",
  })
  .populate({path:'book',
    select:"title",
    populate:{
      path:'author',
      select:"firstName lastName"
    }
  })
  .select("amount quantity purchaseDate")
  .lean()
  return purchase
}