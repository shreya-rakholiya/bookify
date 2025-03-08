import express from "express"
import { getFaqController } from "../../controllers/user/faq.controller";
import { validateAuthIdToken } from "../../middleware/auth";

const faq=express.Router()

faq.use(express.json())

// @ts-ignore
faq.get("/getAll",validateAuthIdToken,getFaqController);

export {faq}
