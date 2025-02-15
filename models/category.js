const mongoose = require("mongoose");

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
},{timestamps:true})


const categoryModel=mongoose.model("Category",categorySchema);

module.exports=categoryModel