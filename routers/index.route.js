const express=require("express");
const { userRoute } = require("./user.route");
const { authRoute } = require("./auth.route");
const { adminRoute } = require("./admin.route");

const rootRouter=express();

rootRouter.use("/auth",authRoute)
rootRouter.use("/user",userRoute)
rootRouter.use("/admin",adminRoute)

module.exports={rootRouter}