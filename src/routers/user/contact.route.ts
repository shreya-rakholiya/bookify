import express from "express";
import { createContactController } from "../../controllers/user/contact.controller";

const contact=express.Router();

contact.use(express.json());

// @ts-ignore
contact.post("/create",createContactController);  

export {contact}