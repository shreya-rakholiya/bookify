const express=require("express");
import {author} from "./admin/author.router";
import { blogRoute } from "./admin/blog.route";
import { blogDetailRoute } from "./admin/blogDetail.route";
import { bookRoute } from "./admin/book.route";
import { categoryRoute } from "./admin/category.route";
import { contact } from "./admin/contact.router";
import { faq } from "./admin/faq.router";
import { newsLetterRoute } from "./admin/newsLetter.router";
import { profileRoute } from "./admin/profile.route";

const adminRoute=express.Router()

adminRoute.use("/author",author)
adminRoute.use("/contact",contact)
adminRoute.use("/newsLetter",newsLetterRoute)
adminRoute.use("/faq",faq)
adminRoute.use("/book",bookRoute)
adminRoute.use("/book-category",categoryRoute)
adminRoute.use("/blog",blogRoute)
adminRoute.use('/profile',profileRoute)
adminRoute.use('/blogDetail',blogDetailRoute)

export {adminRoute}