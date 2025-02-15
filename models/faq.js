const mongoose = require("mongoose");

const faqSchema=new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
},{timestamps:true})

const faqModel=mongoose.model("Faq",faqSchema);
module.exports=faqModel;