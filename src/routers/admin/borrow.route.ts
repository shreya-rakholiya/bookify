import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { validateAdmin } from '../../middleware/validateAdmin';
import { borrowController } from '../../controllers/admin/borrow.controller';

const borrowRoute=express.Router()

borrowRoute.get('/get',validateAuthIdToken,validateAdmin,borrowController)

export {borrowRoute}