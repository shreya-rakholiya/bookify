import express from "express";
import { profileRoute } from "./author/profile.route";
import { bookRoute } from "./author/book.controller";


const authorRoute = express.Router();

authorRoute.use("/profile", profileRoute);
authorRoute.use('/book',bookRoute)

export { authorRoute };