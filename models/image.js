const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },type:{
      type:String,
      default:"image",
      enum:["image","video"]
    }
  },
  { timestamps: true }
);


const mediaModel=mongoose.model("Media",mediaSchema)
module.exports=mediaModel