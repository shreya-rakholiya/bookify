import express from "express";
import { profileRoute } from "./author/profile.route";
import { bookRoute } from "./author/book.route";
import { reviewRoute } from "./author/review.route";


const authorRoute = express.Router();

authorRoute.use("/profile", profileRoute);
authorRoute.use('/book',bookRoute)
authorRoute.use('/review',reviewRoute)

export { authorRoute };