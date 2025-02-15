const express=require("express");
const { createContactController } = require("../../controllers/user/contact.controller");

const contact=express();

contact.use(express.json());

contact.post("/create",createContactController)   

module.exports={contact}