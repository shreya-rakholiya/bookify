const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "librarian", "user"],
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      default:""
    },
  },
  { timestamps: true }
);

const registerModel=mongoose.model("Register",registrationSchema);
module.exports=registerModel;
