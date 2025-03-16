import express from "express";
import { profileRoute } from "./author/profile.route";


const authorRoute = express.Router();

authorRoute.use("/profile", profileRoute);

export { authorRoute };