import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAdminProfileController, updateAdminProfileController } from '../../controllers/admin/profile.controller';
import { validateAdmin } from '../../middleware/validateAdmin';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,validateAdmin,getAdminProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,validateAdmin,updateAdminProfileController)

export {profileRoute}