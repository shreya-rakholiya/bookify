import express from 'express'
import { createBlogDetailController } from '../../controllers/admin/blogDetail.controller';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';

const blogDetailRoute=express.Router();

// @ts-ignore
blogDetailRoute.post('/create',validateAuthIdToken,validateAdmin,createBlogDetailController)
// @ts-ignore
blogDetailRoute.get('/get/:bId',validateAuthIdToken,validateAdmin,createBlogDetailController)
// @ts-ignore
blogDetailRoute.delete('/delete/:bId',validateAuthIdToken,validateAdmin,createBlogDetailController)
// @ts-ignore
blogDetailRoute.patch('/update/:bId',validateAuthIdToken,validateAdmin,createBlogDetailController)

export {blogDetailRoute}