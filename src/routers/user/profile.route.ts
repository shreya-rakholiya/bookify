import express from 'express';
import { getBorrowedBooksController, getUserProfileController, updateUserProfileController } from '../../controllers/user/profile.controller';
import { validateAuthIdToken } from '../../middleware/auth';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,getUserProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,updateUserProfileController)
// @ts-ignore
profileRoute.get('/borrow',validateAuthIdToken,getBorrowedBooksController)

export {profileRoute}