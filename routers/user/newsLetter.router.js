const express=require("express");
const { createNewsLetterController } = require("../../controllers/user/newsLetter.controller");

const newsLetter=express();

newsLetter.post("/create",createNewsLetterController);

module.exports={
    newsLetter
}