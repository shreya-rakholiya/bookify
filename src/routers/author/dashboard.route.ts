import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';
import { validateAuthor } from '../../middleware/validateAuthor';
import { totalBookController } from '../../controllers/author/dashboard.controller';
const dashboardRoute=express.Router();

dashboardRoute.get('/book',validateAuthIdToken,validateAuthor,totalBookController)

export {dashboardRoute}