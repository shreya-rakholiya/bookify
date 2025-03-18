import { borrowStatusTrackModel } from "../models/borrowStatusTrack.model";
import { userModel } from "../models/user";
import { findBorrowRecord } from "../services/borrow.service";
import { createFine } from "../services/fine.service";

const { MongoClient } = require("mongodb");

export async function monitorChanges() {
  // const pipeline = [];
  // const options = { fullDocument: "updateLookup" };
  const changeStream = borrowStatusTrackModel.watch();
  // const changeStream = collection.watch();

  console.log("Watching for changes in the collection...");

  changeStream.on("change", async (change) => {
    console.log(change, "change");

    console.log("Operation Type:", change.operationType);
    console.log("Updated Document:", change.fullDocument);
    console.log("Change detected:", change);
    if (change.operationType === "delete") {
      const borrowId = change.documentKey._id;
      console.log(borrowId,"borrowid");
      
      const borrowRecord = await findBorrowRecord(borrowId);
      console.log(borrowRecord, "borrooowww");

      const fine = await createFine({
        borrowId,
        user: borrowRecord.userId,
        amount: 20,
        daysLate: 1,
        status: "pending",
      });
      console.log(fine,"fineeeee");
      
    }
    // const orderId = change.documentKey._id;
    // const updatedFields = change.updateDescription.updatedFields;
    // console.log('orderId:', orderId, 'updatedFields:', updatedFields);

    // io.emit('orderStatusUpdate', { orderId, updatedFields });
    // }
  });
}

// monitorChanges().catch(console.error);
