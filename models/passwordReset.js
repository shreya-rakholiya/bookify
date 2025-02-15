const mongoose = require("mongoose");

const passwordResetSchema=new mongoose.Schema({
    user:{
        type:Types.objectId,
        ref:"Register",
        required:true
    },
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expiresAt:{
        type:Date
    }
})


const passwordResetModel=mongoose.model("PasswordReset",passwordResetSchema)
module.exports=passwordResetModel