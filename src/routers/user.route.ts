    import  express from "express";
    import { author } from "./user/author.route";
    import { contact } from "./user/contact.route";
    import { newsLetter } from "./user/newsLetter.router";
import { faq } from "./user/faq.route";
import { purchaseRoute } from "./user/purchase.route";
import testRouter from "./user/test";
import { paymentRoute } from "./user/payment.route";
import { borrowRoute } from "./user/borrow.route";

    const userRoute=express.Router();

    userRoute.use("/author",author)
    userRoute.use("/contact",contact)
    userRoute.use("/newsLetter",newsLetter);
    userRoute.use("/faq",faq);
    userRoute.use("/purchase",purchaseRoute);
    userRoute.use("/payment",paymentRoute);
    userRoute.use("/borrow",borrowRoute);

    export {userRoute}