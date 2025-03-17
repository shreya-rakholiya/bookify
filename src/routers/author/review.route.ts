import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAllBooksWithReviewsController } from '../../controllers/author/review.controller';

const reviewRoute=express.Router();

// @ts-ignore
reviewRoute.get('/get',validateAuthIdToken,getAllBooksWithReviewsController);

export {reviewRoute}