const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})


const orderModel=mongoose.model("Order",orderSchema);
module.exports=orderModel