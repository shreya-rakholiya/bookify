import express from "express";
import { profileRoute } from "./author/profile.route";
import { bookRoute } from "./author/book.route";
import { reviewRoute } from "./author/review.route";
import { categoryRoute } from "./author/category.route";
import { dashboardRoute } from "./author/dashboard.route";
import { purchaseRoute } from "./author/purchase.controller";


const authorRoute = express.Router();

authorRoute.use("/profile", profileRoute);
authorRoute.use('/book',bookRoute)
authorRoute.use('/review',reviewRoute)
authorRoute.use('/category',categoryRoute)
authorRoute.use('/dashboard',dashboardRoute)
authorRoute.use('/purchase',purchaseRoute)


export { authorRoute };