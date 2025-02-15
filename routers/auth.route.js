const express=require("express");
const { registerController, loginController } = require("../controllers/auth.controller");
const authRoute=express();
authRoute.use(express.json());
authRoute.use(express.urlencoded({ extended: true }));

authRoute.post("/register",registerController);
authRoute.post("/login",loginController);

module.exports={authRoute};

