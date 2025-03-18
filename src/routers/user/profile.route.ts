import express from 'express';
import { getBorrowedBooksController, getfinecontroller, getReturnedBooksController, getUserProfileController, updateUserProfileController } from '../../controllers/user/profile.controller';
import { validateAuthIdToken } from '../../middleware/auth';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,getUserProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,updateUserProfileController)
// @ts-ignore
profileRoute.get('/borrow',validateAuthIdToken,getBorrowedBooksController)
// @ts-ignore
profileRoute.get('/return',validateAuthIdToken,getReturnedBooksController)
// @ts-ignore
profileRoute.get('/fine',validateAuthIdToken,getfinecontroller)

export {profileRoute}