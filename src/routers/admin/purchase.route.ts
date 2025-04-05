import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';
import { purchaseController } from '../../controllers/admin/purchase.controller';

const purchaseRoute=express.Router()

purchaseRoute.get('/get',validateAuthIdToken,validateAdmin,purchaseController)

export {purchaseRoute}