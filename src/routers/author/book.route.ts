import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { fileUpload } from '../../middleware/fileUpload';
import { createBookController, deleteBookController, getAllBookController, updateBookController, uploadBookImage } from '../../controllers/author/book.controller';
import { validateAuthor } from '../../middleware/validateAuthor';
const bookRoute=express.Router();

// @ts-ignore
bookRoute.post('/upload',validateAuthIdToken,fileUpload,uploadBookImage)
// @ts-ignore
bookRoute.post('/create',validateAuthIdToken,validateAuthor,createBookController)
// @ts-ignore
bookRoute.patch('/update/:bId',validateAuthIdToken,updateBookController)
// @ts-ignore
bookRoute.delete('/delete/:bId',validateAuthIdToken,deleteBookController)
// @ts-ignore
bookRoute.get('/get',validateAuthIdToken,getAllBookController)

export {bookRoute}