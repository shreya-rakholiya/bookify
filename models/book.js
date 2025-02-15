const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image:{
    type:Types.ObjectId,
    ref:"Image"
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Register",
    default:""
  },
  isbn: {
    type: Number,
    lenght: 13,
  },
  category: {},
  price: {
    type: Number,
  },
  publishedYear: {
    type: Number,
  },
  publisher: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  totalCopies: {
    type: Number,
    default: 0,
  },
  cpoiesAvailable: {
    type: Number,
    default:0
  },
  averageRating:{

  },
  reviews:{
    type:mongoose.Types.ObjectId,
    ref:"Review",
    required:false
  },

},{timestamps:true});


const bookModel=mongoose.model("Book",bookSchema);
module.exports=bookModel
