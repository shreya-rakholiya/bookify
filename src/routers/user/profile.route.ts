import express from 'express';
import { getBorrowedBooksController, getfinecontroller, getPurchaseController, getReturnedBooksController, getUserProfileController, updateUserProfileController } from '../../controllers/user/profile.controller';
import { validateAuthIdToken } from '../../middleware/auth';
const profileRoute=express.Router();

profileRoute.get('/get',validateAuthIdToken,getUserProfileController)
profileRoute.patch('/update',validateAuthIdToken,updateUserProfileController)
profileRoute.get('/borrow',validateAuthIdToken,getBorrowedBooksController)
profileRoute.get('/return',validateAuthIdToken,getReturnedBooksController)
profileRoute.get('/fine',validateAuthIdToken,getfinecontroller)
profileRoute.get('/purchase',validateAuthIdToken,getPurchaseController)

export {profileRoute}