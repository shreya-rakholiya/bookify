import express from 'express';
import { fileUpload } from '../../middleware/fileUpload';
import { createBookController, deleteBookController, getAllBookController, updateBookController, uploadBookImage } from '../../controllers/admin/book.controller';
import { getAvailableBooks } from '../../controllers/user/book.controller';

const bookRoute=express();
// @ts-ignore
bookRoute.post('/upload',fileUpload,uploadBookImage);
// @ts-ignore
bookRoute.post('/create',createBookController);
// @ts-ignore
bookRoute.patch('/update/:bId',updateBookController);
// @ts-ignore
bookRoute.delete('/delete/:bId',deleteBookController);
// @ts-ignore
bookRoute.get('/get',getAllBookController);
// @ts-ignore
// bookRoute.get('/get',getAvailableBooks);



export {bookRoute}