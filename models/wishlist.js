const mongoose = require("mongoose");

const wishlistSchema=new mongoose.Schema({
    user:{
        type:Types.objectId,
        required:true,
        ref:"Register"
    },
    book:{
        type:Types.objectId,
        ref:"Book",
        required:true,
    },
    addedAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true})


const wishlistModel=mongoose.model("Wishlist",wishlistSchema);
module.exports=wishlistModel

