const mongoose=require("mongoose");

const conatctSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    subject:{
        type:String,
        default:""
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const contactModel=mongoose.model("Contact",conatctSchema);
module.exports=contactModel;