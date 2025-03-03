import express from "express"
import { createFaqController, deleteFaqController, getFaqController, updateFaqController } from "../../controllers/admin/faq.controller";
import { validateAuthIdToken } from "../../middleware/auth";
import { validateAdmin } from "../../middleware/validateAdmin";


const faq=express.Router()

faq.use(express.json())

// @ts-ignore
faq.get("/getAll",getFaqController);
// @ts-ignore
faq.post("/create",createFaqController);
// @ts-ignore
faq.delete("/delete/:fId",deleteFaqController);
// @ts-ignore
faq.patch("/update/:fId",updateFaqController);

export {faq}
