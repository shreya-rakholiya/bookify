import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAlluserController } from '../../controllers/admin/user.controller';
const userRoute=express.Router();

userRoute.get('/get',validateAuthIdToken,getAlluserController)

export {userRoute}