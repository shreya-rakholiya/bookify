const express=require("express");
const { author } = require("./user/author.route");
const { contact } = require("./user/contact.route");
const { newsLetter } = require("./user/newsLetter.router");

const userRoute=express();

userRoute.use("/author",author)
userRoute.use("/contact",contact)
userRoute.post("/news-letter",newsLetter);

module.exports={userRoute}