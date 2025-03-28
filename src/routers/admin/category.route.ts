import express from 'express';
import { createBookCategoryController, deleteBookCategory, getAllBookCategory, updateCategoryController } from '../../controllers/admin/bookCategory.controller';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';

const categoryRoute=express.Router();

// @ts-ignore
categoryRoute.post('/create',validateAuthIdToken,validateAdmin,createBookCategoryController)
// @ts-ignore
categoryRoute.get('/getAll',validateAuthIdToken,validateAdmin,getAllBookCategory)
// @ts-ignore
categoryRoute.delete('/delete/:cId',validateAuthIdToken,validateAdmin,deleteBookCategory)
// @ts-ignore
categoryRoute.patch('/update/:cId',validateAuthIdToken,validateAdmin,updateCategoryController)

export {categoryRoute}