import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAllBooksWithReviewsController } from '../../controllers/author/review.controller';
import { validateAuthor } from '../../middleware/validateAuthor';

const reviewRoute=express.Router();

// @ts-ignore
reviewRoute.get('/get',validateAuthIdToken,validateAuthor,getAllBooksWithReviewsController);

export {reviewRoute}