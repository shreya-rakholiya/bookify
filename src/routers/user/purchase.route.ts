import express from 'express';
import { getPurchaseHistoryController, initiatePurchaseController } from '../../controllers/user/purchase.controller';
import { validateAuthIdToken } from '../../middleware/auth';
const purchaseRoute=express.Router();

// @ts-ignore
purchaseRoute.post('/initiate',validateAuthIdToken,initiatePurchaseController)
// @ts-ignore
purchaseRoute.get('/history/:userId',validateAuthIdToken,getPurchaseHistoryController)

export { purchaseRoute}