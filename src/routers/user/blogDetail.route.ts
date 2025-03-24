import express from 'express'
import { createBlogDetailController } from '../../controllers/admin/blogDetail.controller';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';

const blogDetailRoute=express.Router();


// @ts-ignore
blogDetailRoute.get('/get/:bId',validateAuthIdToken,validateAdmin,createBlogDetailController)
export {blogDetailRoute}