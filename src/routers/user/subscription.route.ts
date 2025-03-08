import express from 'express';
import { cancelSubscriptionController, createSubscriptionPlanController, getSubscriptionPlanController, getUserSubscriptionCpntroller, handleWebhook, initiateSubscriptionController, verifySubscriptionPaymentController } from '../../controllers/user/subscription.controller';

const subscriptionRoute=express.Router()

subscriptionRoute.post('/plans',createSubscriptionPlanController)
subscriptionRoute.get('/plans',getSubscriptionPlanController)
subscriptionRoute.post('/initiate',initiateSubscriptionController)
subscriptionRoute.post('/verify',verifySubscriptionPaymentController)
subscriptionRoute.post('cancle/:subscriptionId',cancelSubscriptionController)
subscriptionRoute.get('/user/:userId',getUserSubscriptionCpntroller)

subscriptionRoute.post('/webhook',handleWebhook)

export {subscriptionRoute}