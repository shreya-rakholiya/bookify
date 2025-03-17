import express from 'express';
import { registerController, loginController, uploadProfileImage, forgetPassword, resetPasswordController, logoutController } from "../controllers/auth.controller"; // Ensure file exists
import { fileUpload } from '../middleware/fileUpload';
import { validateAuthIdToken } from '../middleware/auth';

const authRoute = express.Router(); // ✅ Corrected

authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));
// @ts-ignore
authRoute.post('/upload',fileUpload,uploadProfileImage)
//@ts-ignore
authRoute.post("/register", registerController);
// @ts-ignore
authRoute.post("/login", loginController);
// @ts-ignore
authRoute.post('/forget',validateAuthIdToken,forgetPassword)
// @ts-ignore
authRoute.patch('/reset',validateAuthIdToken,resetPasswordController)
// @ts-ignore
authRoute.post('/logout',validateAuthIdToken,logoutController)

export { authRoute };