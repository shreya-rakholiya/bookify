import { ObjectId } from "mongoose";
import { fineModel } from "../models/fine";
import { overdueBooks, updateBorrow } from "../services/borrow.service";
import { createFine, findFine } from "../services/fine.service";
import { createOrder, findOrder } from "../services/order.service";

export const proccessMissedFine = async () => {
  console.log("Checking and Proocessing missed fine...");

  const overdueBorrow = await overdueBooks();
  // console.log(overdueBorrow,"overdueborrow");
  
  for (const borrow of overdueBorrow) {
    const overdueDays = Math.floor(
      (Date.now() - borrow.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log(overdueDays,"overdue days");
    // @ts-ignore
    let fine = await findFine(borrow._id);
    // console.log(fine,"fineeee");
    
    if (!fine) {
      console.log("create");
      
      let fine = await createFine({
        borrowId: borrow._id,
        user: borrow.userId,
        amount: 20 * overdueDays,
        daysLate: overdueDays,
        status: "pending",
      });
      // console.log(fine,"fineee");
      
    } else if (fine.status === "pending") {
      console.log("enter update");
      
      await fineModel.updateOne(
        { _id: fine._id },
        { $set: { amount: overdueDays * 20, daysLate: overdueDays } }
      );
    }
    if (fine) {
      await updateBorrow({_id:borrow._id},{status:'overdue'});
    }
  }
  console.log("✅ Missed fines processed successfully.");
};
