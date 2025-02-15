const express=require("express");
const { getNewsLetterController, deleteNewsLetterController } = require("../../controllers/admin/newsLetter.controller");
const { validateAuthIdToken } = require("../../middleware/auth");
const { validateAdmin } = require("../../middleware/validateAdmin");

const newsLetterRoute=express();

newsLetterRoute.get("/get",validateAuthIdToken,validateAdmin,getNewsLetterController);
newsLetterRoute.delete("/delete",validateAuthIdToken,validateAdmin,deleteNewsLetterController);

module.exports={newsLetterRoute}