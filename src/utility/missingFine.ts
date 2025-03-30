import { fineModel } from "../models/fine";
import { overdueBooks, updateBorrow } from "../services/borrow.service";
import { createFine, findFine } from "../services/fine.service";
import { createOrder, findOrder } from "../services/order.service";

export const proccessMissedFine = async () => {
  console.log("Checking and Proocessing missed fine...");

  const overdueBorrow = await overdueBooks();

  for (const borrow of overdueBorrow) {
    const overdueDays = Math.floor(
      (Date.now() - borrow.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );

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
      await updateBorrow({_id:borrow._id},{status:'overdue'});
    }
  }
  console.log("✅ Missed fines processed successfully.");
};
