import express from "express";
import { createNewsLetterController } from "../../controllers/user/newsLetter.controller";

const newsLetter=express.Router();

// @ts-ignore
newsLetter.post("/create",createNewsLetterController);

export {newsLetter}
