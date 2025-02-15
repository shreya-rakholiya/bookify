const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "Register",
    },
    blogDetail: {
      type: Types.ObjectId,
      ref: "BlogDetail",
    },
  },
  { timestamps: true }
);

const blogModel=mongoose.model("Blog",blogSchema);
module.exports=blogModel;