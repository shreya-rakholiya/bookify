import express from 'express';
import { getPurchaseHistoryController, initiatePurchaseController } from '../../controllers/user/purchase.controller';
const purchaseRoute=express.Router();

// @ts-ignore
purchaseRoute.post('/initiate',initiatePurchaseController)
// @ts-ignore
purchaseRoute.get('/history/:userId',getPurchaseHistoryController)

export { purchaseRoute}