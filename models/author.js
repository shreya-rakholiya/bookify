const { ref, required } = require("joi");
const mongoose=require("mongoose");

const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        default:""
    },
    image:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"media",
        required:false
    }
},{timestamps:true});

const authorModel=mongoose.model("Author",authorSchema);
module.exports=authorModel