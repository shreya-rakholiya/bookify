import express from "express";
import { findAuthorController } from "../../controllers/user/author.controller";
import { validateAuthIdToken } from "../../middleware/auth";
import { validateAdmin } from "../../middleware/validateAdmin";
const author=express.Router();

// @ts-ignore
author.post("/get",validateAuthIdToken,findAuthorController);

export {author}