const mongoose=require("mongoose");

const newsLetterSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    subscribedAt:{
        type:Date,
        default:Date.now
    }
})


const newsLetterModel=mongoose.model("NewsLetter",newsLetterSchema);
module.exports=newsLetterModel;