import { Response } from "express";
import { Request } from "../../types/request";
import {
  findBorrowedBookOfUser,
  findreturnedBorrowBookOfUser,
  getProfile,
  updateProfile,
} from "../../services/user.service";
import { createFine, findFine, getFine } from "../../services/fine.service";
import { fineModel } from "../../models/fine";
import { updateBorrow } from "../../services/borrow.service";
import { borrowModel } from "../../models/borrow";

export const getUserProfileController = async (req: Request, res: Response) => {
  try {
    const authUSer = req.authUser;
    console.log(authUSer,"authUser");
    
    const role = "user";
    const admin = await getProfile(authUSer._id, role);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "No Admin Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    const authUSer = req.authUser;
    const payload = req.body;
    const role = "user";
    const updatedUser = await updateProfile(authUSer._id, role, { ...payload });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "No Admin Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBorrowedBooksController = async (
  req: Request,
  res: Response
) => {
  try {
    const authUserId = req.authuserId;
    // @ts-ignore
    const borrowRecord = await findBorrowedBookOfUser(authUserId);
    if (!borrowRecord.borrowedBooks.length) {
      return res.status(404).json({
        success: false,
        message: "No borrowed Books Found",
      });
    }

    console.log(borrowRecord, "dateeee");
    const currentDate = new Date();

    const borrows = await borrowModel
      .find({ user: authUserId })
      .populate("book")
      .sort({ borrowDate: -1 });

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

    return res.status(200).json({
      success: true,
      data: borrowRecord,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getReturnedBooksController = async (
  req: Request,
  res: Response
) => {
  try {
    const authUserId = req.authuserId;
    // @ts-ignore
    const borrowedBooks = await findreturnedBorrowBookOfUser(authUserId);
    if (!borrowedBooks) {
      return res.status(404).json({
        success: false,
        message: "No borrowed Books Found",
      });
    }
    console.log(borrowedBooks, "dateeee");

    return res.status(200).json({
      success: true,
      data: borrowedBooks,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getfinecontroller = async (req: Request, res: Response) => {
  try {
    const authUserId = req.authuserId as string;
    const fine = await getFine(authUserId);
    if (!fine) {
      return res.status(404).json({
        success: false,
        message: "No fine found",
      });
    }

    return res.status(200).json({
      success: true,
      data: fine,
      message: "Fine fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
