import express from "express";
import { author } from "./user/author.route";
import { contact } from "./user/contact.route";
import { newsLetter } from "./user/newsLetter.router";
import { faq } from "./user/faq.route";
import { purchaseRoute } from "./user/purchase.route";
import testRouter from "./user/test";
import { paymentRoute } from "./user/payment.route";
import { borrowRoute } from "./user/borrow.route";
import { blogRoute } from "./admin/blog.route";
import { book } from "./user/book.route";
import { wishlistRoute } from "./user/wishlist.route";
import { profileRoute } from "./user/profile.route";
import { reviewRoute } from "./user/review.route";
import { subscriptionRoute } from "./user/subscription.route";

const userRoute = express.Router();

userRoute.use("/author", author);
userRoute.use("/book", book);
userRoute.use("/contact", contact);
userRoute.use("/newsLetter", newsLetter);
userRoute.use("/faq", faq);
userRoute.use("/purchase", purchaseRoute);
userRoute.use("/payment", paymentRoute);
userRoute.use("/borrow", borrowRoute);
userRoute.use("/blog", blogRoute);
userRoute.use('/wishlist',wishlistRoute)
userRoute.use('/profile',profileRoute)
userRoute.use('/review',reviewRoute)
userRoute.use('/subscription',subscriptionRoute)

export { userRoute };