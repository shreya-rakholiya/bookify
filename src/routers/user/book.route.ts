import express from "express";
import { getAllBookController, getAvailableBooks, getBookController } from "../../controllers/user/book.controller";
import { validateAuthIdToken } from "../../middleware/auth";

const book=express.Router();

// @ts-ignore
book.get('/getAll',validateAuthIdToken,getAllBookController)
// @ts-ignore
book.get('/get',validateAuthIdToken,getBookController)
// @ts-ignore
book.get('/available',validateAuthIdToken,getAvailableBooks)

export {book}