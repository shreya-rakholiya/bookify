import exp from 'constants'
import express from 'express'
import { getBorrowHistoryController, initiateBorrowController, returnBookController } from '../../controllers/user/borrow.controller';

const borrowRoute=express.Router();

// @ts-ignore
borrowRoute.post('/initiate',initiateBorrowController)
// @ts-ignore
borrowRoute.post('/return/:borrowId',returnBookController)
// @ts-ignore
borrowRoute.get('/history/:userId',getBorrowHistoryController)

export { borrowRoute}