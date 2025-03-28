import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';
import { totalAuthorController, totalBookController, totalPurchaseController, totaluserController } from '../../controllers/admin/dashboard.controller';
const dashboardRoute=express.Router();

dashboardRoute.get('/user',validateAuthIdToken,validateAdmin,totaluserController)
dashboardRoute.get('/author',validateAuthIdToken,validateAdmin,totalAuthorController)
dashboardRoute.get('/book',validateAuthIdToken,validateAdmin,totalBookController)
dashboardRoute.get('/sell',validateAuthIdToken,validateAdmin,totalPurchaseController)

export {dashboardRoute}