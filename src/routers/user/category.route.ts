import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAllBookCategory } from '../../controllers/user/bookCategory.controller';

const categoryRoute=express.Router();

categoryRoute.get('/get',getAllBookCategory)

export {categoryRoute}