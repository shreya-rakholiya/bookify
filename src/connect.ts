import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL,{
      dbName: process.env.DB_NAME,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    });
    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error(" Error connecting to MongoDB:", error);
    process.exit(1); // Exit if connection fails
  }
};
