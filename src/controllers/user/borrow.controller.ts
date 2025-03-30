import { Response } from "express";
import { Request } from "../../types/request";
import { initiateBorrow, returnBook, updateBorrow } from "../../services/borrow.service";
import { ObjectId, Types } from "mongoose";
import { borrowModel } from "../../models/borrow";
import { createFine, findFine } from "../../services/fine.service";
import { fineModel } from "../../models/fine";

export const initiateBorrowController = async (req: Request, res: Response) => {
  try {
    const authuserId = req.authuserId as ObjectId;
    const { bookId } = req.body;
    console.log(authuserId, "userId", bookId);

    const result = await initiateBorrow(authuserId, bookId);
    console.log(result, "borrow result");

    res
      .status(200)
      .json({ success: true, message: "Suceessfull", data: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error",
      err,
    });
  }
};

export const returnBookController = async (req: Request, res: Response) => {
  try {
    console.log(req.params, "paramsss");
    const { borrowId } = req.params;
    console.log(borrowId, "borrowId");

    const result = await returnBook(borrowId);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res
      .status(400)
      .json({ message: (err as Error).message, success: false });
  }
};

export const getBorrowHistoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const borrows = await borrowModel
      .find({ user: userId })
      .populate("book")
      .sort({ borrowDate: -1 });

    const currentDate = new Date();

    borrows.map(async (borrow) => {
      if (borrow.dueDate < currentDate && borrow.status !== "returned") {
        const overdueDays = Math.floor(
          (currentDate.getTime() - borrow.dueDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        const fineAmount = overdueDays * 20;
        let fine = await findFine(borrow._id);
        if (!fine) {
          let fine = await createFine({
            borrowId: borrow._id,
            user: borrow.userId,
            amount: 20 * overdueDays,
            daysLate: overdueDays,
            status: "pending",
          });
        } else if (fine.status === "pending") {
          await fineModel.updateOne(
            { _id: fine._id },
            { $set: { amount: overdueDays * 20, daysLate: overdueDays } }
          );
        }
        if (fine) {
          await updateBorrow({ _id: borrow._id }, { status: "overdue" });
        }
      }
    });

    res.status(200).json({ success: true, data: borrows });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch borrow history" });
  }
};
