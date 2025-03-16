import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAdminProfileController, updateAdminProfileController } from '../../controllers/admin/profile.controller';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,getAdminProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,updateAdminProfileController)

export {profileRoute}