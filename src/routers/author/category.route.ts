import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAllBookCategory } from '../../controllers/author/category.controller';

const categoryRoute=express.Router();

categoryRoute.get('/getAll',validateAuthIdToken,getAllBookCategory)

export {categoryRoute}