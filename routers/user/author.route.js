const express=require("express");
const { findAuthorController } = require("../../controllers/user/author.controller");
const { validateAuthIdToken } = require("../../middleware/auth");
const { validateAdmin } = require("../../middleware/validateAdmin");
const author=express();

author.post("/get",validateAuthIdToken,validateAdmin,findAuthorController);

module.exports={author}