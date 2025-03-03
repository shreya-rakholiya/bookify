// src/routes/test.routes.ts
import express from 'express';

const testRouter = express.Router();

testRouter.get('/razorpay-test', (req, res) => {
  res.render('payment', {
    razorpayKeyId: process.env.API_KEY
  });
});

export default testRouter;