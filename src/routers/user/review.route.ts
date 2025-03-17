import express from "express"
import { validateAuthIdToken } from "../../middleware/auth";
import { createReviewController, getAllReviewsController } from "../../controllers/user/review.controller";
const reviewRoute=express.Router();

// @ts-ignore
reviewRoute.post('/create/:bId',validateAuthIdToken,createReviewController)
// @ts-ignore
reviewRoute.get('/getAll/:bId',validateAuthIdToken,getAllReviewsController)

export {reviewRoute}
