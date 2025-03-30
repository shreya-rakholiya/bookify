import { overdueBooks } from "../services/borrow.service";
import { findFine } from "../services/fine.service";
import { findOrder } from "../services/order.service";

export const proccessMissedFine = async () => {
  console.log("Checking and Proocessing missed fine...");

  const overdueBorrow = await overdueBooks();

  for (const borrow of overdueBorrow) {
    const overdueDays = Math.floor(
      (Date.now() - borrow.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let fine=await findFine(borrow._id);
    let order=await findOrder(fine._id,borrow._id)
    if(!fine){
        
    }
  }
};
