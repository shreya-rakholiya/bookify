import express from 'express';
import { registerController, loginController, uploadProfileImage } from "../controllers/auth.controller"; // Ensure file exists

const authRoute = express.Router(); // ✅ Corrected

authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));
// @ts-ignore
authRoute.post('/upload',uploadProfileImage)
//@ts-ignore
authRoute.post("/register", registerController);
// @ts-ignore
authRoute.post("/login", loginController);

export { authRoute };