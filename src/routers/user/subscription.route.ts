import express from 'express';
import { cancelSubscriptionController, createSubscriptionPlanController, getSubscriptionPlanController, getUserSubscriptionCpntroller, handleWebhook, initiateSubscriptionController, verifySubscriptionPaymentController } from '../../controllers/user/subscription.controller';
import { validateAuthIdToken } from '../../middleware/auth';

const subscriptionRoute=express.Router()

subscriptionRoute.post('/plans',validateAuthIdToken,createSubscriptionPlanController)
subscriptionRoute.get('/plans',validateAuthIdToken,getSubscriptionPlanController)
subscriptionRoute.post('/initiate',validateAuthIdToken,validateAuthIdToken,initiateSubscriptionController)
subscriptionRoute.post('/verify',validateAuthIdToken,verifySubscriptionPaymentController)
subscriptionRoute.post('/cancle/:subscriptionId',validateAuthIdToken,cancelSubscriptionController)
subscriptionRoute.get('/get/:userId',validateAuthIdToken,getUserSubscriptionCpntroller)

subscriptionRoute.post('/webhook',validateAuthIdToken,handleWebhook)

export {subscriptionRoute}