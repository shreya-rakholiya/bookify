const authorModel = require("../models/author");
const { findOne } = require("../models/registration");

const createAuthor=async (input)=>{
    const author=await new authorModel(input).save();
    return author;
}

const findAuthor=async (query)=>{
    const author = await authorModel.findOne(query);
    return author;
}

const findAllAuthor=async()=>{
    const authors=await authorModel.find();
    return authors;
}

const updateAuthor=async(query,update)=>{
    const author = await authorModel.updateOne(query,update);
    return author;
}

const deleteAuthor=async (query)=>{
    const author = await authorModel.deleteOne(query);
    return author;
}

module.exports={
    createAuthor,
    findAuthor,
    findAllAuthor,
    updateAuthor,
    deleteAuthor
}