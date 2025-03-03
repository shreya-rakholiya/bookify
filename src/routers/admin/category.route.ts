import express from 'express';
import { createBookCategoryController, deleteBookCategory, getAllBookCategory, updateCategoryController } from '../../controllers/admin/bookCategory.controller';

const categoryRoute=express.Router();

// @ts-ignore
categoryRoute.post('/create',createBookCategoryController)
// @ts-ignore
categoryRoute.get('/getAll',getAllBookCategory)
// @ts-ignore
categoryRoute.delete('/delete/:cId',deleteBookCategory)
// @ts-ignore
categoryRoute.patch('/update/:cId',updateCategoryController)

export {categoryRoute}