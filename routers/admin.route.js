const express=require("express");
const { author } = require("./admin/author.router");
const { contact } = require("./admin/contact.router");
const { newsLetterRoute } = require("./admin/newsLetter.router");

const adminRoute=express()

adminRoute.use("/author",author)
adminRoute.use("/contact",contact)
adminRoute.use("/newsLetter",newsLetterRoute)

module.exports={
    adminRoute
}