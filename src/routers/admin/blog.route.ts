import express from 'express'
import { createBlogController, deleteBlogController, getAllBlogController, getBlogController, updateBlogController, uploadBlogImage } from '../../controllers/admin/blog.controller'

const blogRoute=express.Router()
// @ts-ignore
blogRoute.post('/upload',uploadBlogImage)
// @ts-ignore
blogRoute.post('/create',createBlogController)
// @ts-ignore
blogRoute.get('/get/:bId',getBlogController)
// @ts-ignore
blogRoute.get('/getAll',getAllBlogController)
// @ts-ignore
blogRoute.delete('/delete/:bId',deleteBlogController)
// @ts-ignore
blogRoute.patch('/update/:bId',updateBlogController)

export {blogRoute}