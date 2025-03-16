import express from 'express';
import { verifyPaymentController } from '../../controllers/user/payment.controller';
import { validateAuthIdToken } from '../../middleware/auth';

const paymentRoute=express.Router();

// @ts-ignore
paymentRoute.post('/verify',validateAuthIdToken,verifyPaymentController)

export {paymentRoute}