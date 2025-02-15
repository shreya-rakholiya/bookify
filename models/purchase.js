const mongoose=require("mongoose");

const purchaseSchema=new mongoose.Schema({
    user:{
        type:Types.objectId,
        ref:"Register"
    },
    book:{
        type:Types.objectId,
        ref:"Book"
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    totalAmount:{
        type:Number
    },
    status:{
        type:String
    }
})


const purchaseModel=mongoose.model("Purchase",purchaseSchema);
module.exports=purchaseModel