import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAuthorProfileController } from '../../controllers/author/profile.controller';
import { updateAuthorController } from '../../controllers/admin/auther.controller';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,getAuthorProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,updateAuthorController)

export {profileRoute}