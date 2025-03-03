const express=require("express");
const { getNewsLetterController, deleteNewsLetterController } = require("../../controllers/admin/newsLetter.controller");
const { validateAuthIdToken } = require("../../middleware/auth");
const { validateAdmin } = require("../../middleware/validateAdmin");

const newsLetterRoute=express();

newsLetterRoute.get("/get",getNewsLetterController);
newsLetterRoute.delete("/delete/:nId",deleteNewsLetterController);

export {newsLetterRoute}