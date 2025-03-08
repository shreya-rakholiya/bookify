import express from 'express';
import { getAllBlogController } from '../../controllers/user/blog.controller';

const blogRoute=express.Router();

// @ts-ignore
blogRoute.get('/getAll',getAllBlogController)

export {blogRoute}