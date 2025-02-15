const mongoose=require("mongoose")

const reviewSchema=new mongoose.Schema({
    user:{
        type:Types.objectId,
        ref:"Register",
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    rating:{

    }
},{timestamps:true})

const reviewModel=mongoose.model("Review",reviewSchema);

module.exports=reviewModel