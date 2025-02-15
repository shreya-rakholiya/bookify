const mongoose=require("mongoose");

const fineSchema=new mongoose.Schema({
    amount:{
        type:Number,
        default:0
    },
    user:{
        type:Types.objectId,
        ref:"Register"
    },
    order:{
        type:Types.objectId,
        ref:"Order"
    },
    reason:{
        type:String,
        default:""
    }
})


const fineModel=mongoose.model("Fine",fineSchema);

module.exports=fineModel