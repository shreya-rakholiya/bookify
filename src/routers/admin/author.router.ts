import express from "express";
import { createAuthorController, deleteAuthorController, updateAuthorController, getAllAuthorController, uploadAuthorImage } from "../../controllers/admin/auther.controller";
const author=express.Router();
import {validateAuthIdToken} from "../../middleware/auth";
import { validateAdmin } from "../../middleware/validateAdmin";

// @ts-ignore
author.post("/upload",validateAuthIdToken,validateAdmin,uploadAuthorImage);
// @ts-ignore
author.post("/create",validateAuthIdToken,validateAdmin,createAuthorController);
// @ts-ignore
author.delete("/delete/:aId",validateAuthIdToken,validateAdmin,deleteAuthorController);
// @ts-ignore
author.patch("/update",validateAuthIdToken,validateAdmin,updateAuthorController);
// @ts-ignore
author.get("/getAll",validateAuthIdToken,validateAdmin,getAllAuthorController);

export {author}