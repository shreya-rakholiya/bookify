import exp from 'constants'
import express from 'express'
import { getBorrowHistoryController, initiateBorrowController, returnBookController } from '../../controllers/user/borrow.controller';
import { validateAuthIdToken } from '../../middleware/auth';

const borrowRoute=express.Router();

// @ts-ignore
borrowRoute.post('/initiate',validateAuthIdToken,initiateBorrowController)
// @ts-ignore
borrowRoute.post('/return/:borrowId',validateAuthIdToken,returnBookController)
// @ts-ignore
borrowRoute.get('/history/:userId',validateAuthIdToken,getBorrowHistoryController)

export { borrowRoute}