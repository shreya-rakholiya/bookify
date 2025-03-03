import express from 'express';
import { verifyPaymentController } from '../../controllers/user/payment.controller';

const paymentRoute=express.Router();

// @ts-ignore
paymentRoute.post('/verify',verifyPaymentController)

export {paymentRoute}