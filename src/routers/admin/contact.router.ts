const express=require("express");
const { getAllContactController, deleteContactController } = require("../../controllers/admin/contact.controller");
const { validateAuthIdToken } = require("../../middleware/auth");
const { validateAdmin } = require("../../middleware/validateAdmin");

const contact=express();

contact.use(express.json());

contact.get("/getAll",getAllContactController);   
contact.delete("/delete/:cId",deleteContactController);


export {contact}