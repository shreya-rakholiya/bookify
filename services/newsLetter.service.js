const {newsLetterModel} =require("../models/newsLetter")
const createNewsLetter=async(input)=>{
    const newsLetter=await new newsLetterModel(input).save();
    return newsLetter;
}

const findNewsLetter=async(query)=>{
    const newsLetter=await newsLetterModel.find(query);
    return newsLetter;
}

const findAllNewsLetter=async()=>{
    const newsLetter=await newsLetterModel.find();
    return newsLetter;
}

const deleteNewsLetter=async(query)=>{
    const newsLetter=await newsLetterModel.deleteOne(query)
}

module.exports={
    createNewsLetter,
    findNewsLetter,
    deleteNewsLetter,
    findAllNewsLetter
}