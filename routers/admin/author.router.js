const express=require("express");
const { createAuthorController, deleteAuthorController, updateAuthorController, getAllAuthorController } = require("../../controllers/admin/auther.controller");
const author=express();
const {validateAuthIdToken}=require("../../middleware/auth");
const { validateAdmin } = require("../../middleware/validateAdmin");

author.post("/add",validateAuthIdToken,validateAdmin,createAuthorController);
author.delete("/delete",validateAuthIdToken,validateAdmin,deleteAuthorController);
author.patch("/update",validateAuthIdToken,validateAdmin,updateAuthorController);
author.get("/get-all",validateAuthIdToken,validateAdmin,getAllAuthorController);


module.exports={
    author
}