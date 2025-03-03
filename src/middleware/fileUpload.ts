import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";
import { Request } from "../types/request";
import { NextFunction, Response } from "express";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folderType: string;
    if (req.baseUrl.includes("book")) {
      folderType = "books";
    } else if (req.baseUrl.includes("blog")) {
      folderType = "blogs";
    } else if (req.baseUrl.includes("auth")) {
      folderType = "users";
    } else if (req.baseUrl.includes("author")) {
      folderType = "authors";
    } else {
      folderType = "other";
    }
    const folderPath = `bookify/${folderType}`;
    return {
      folder: folderPath, // Specify your Cloudinary folder name
      format: file.mimetype.split("/")[1], // Extract format dynamically
      public_id: file.originalname.split(".")[0], // Use filename as public ID
    };
  },
});
const upload = multer({ storage });

export const fileUpload = (req: Request, res: Response, next: NextFunction) => {
  console.log("----------fileupload start-----------");
  
  upload.array("image", 20)(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "File upload failed", details: err });
    }

    // req.body = req.body || {};
    // console.log(req.body);
    console.log(req.files,"fileee upload");
    
    req.body.files = req.files;
    console.log(req.body.files,"shreya");
console.log("----------fileupload end-----------");
    next();
  });
};
