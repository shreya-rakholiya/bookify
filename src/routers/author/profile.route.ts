import express from 'express';
import { validateAuthIdToken } from '../../middleware/auth';
import { getAuthorProfileController, updateAuthorProfileController } from '../../controllers/author/profile.controller';
const profileRoute=express.Router();

// @ts-ignore
profileRoute.get('/get',validateAuthIdToken,getAuthorProfileController)
// @ts-ignore
profileRoute.patch('/update',validateAuthIdToken,updateAuthorProfileController)

export {profileRoute}