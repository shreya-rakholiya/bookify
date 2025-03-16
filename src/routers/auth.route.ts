import express from 'express';
import { registerController, loginController, uploadProfileImage } from "../controllers/auth.controller"; // Ensure file exists
import { fileUpload } from '../middleware/fileUpload';

const authRoute = express.Router(); // ✅ Corrected

authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));
// @ts-ignore
authRoute.post('/upload',fileUpload,uploadProfileImage)
//@ts-ignore
authRoute.post("/register", registerController);
// @ts-ignore
authRoute.post("/login", loginController);

export { authRoute };