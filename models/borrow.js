const mongoose=require("mongoose");

const borrowSchema=new mongoose.Schema({
    user:{
        type:Types.objectId,
        ref:"Register"
    },
    book:{
        type:Types.objectId,
        ref:"Book"
    },
    borrowDate:{
        type:Date,
        default:Date.now
    },
    dueDate:{
        type:Date
    },
    returnDate:{
        type:Date
    },
    status:{
        type:String
    }
})


const borrowModel=mongoose.model("Borrow",borrowSchema);
module.exports=borrowModel