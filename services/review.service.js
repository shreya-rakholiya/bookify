const mongoose=require("mongoose")
const reviewModel=require("../models/review")

const createReview=async (input)=>{
    const review=await new reviewModel(input).save();
    return review;
};

const findReview=async (query)=>{
    const review=await reviewModel.find(query);
    return review;
}

const deleteReview=async (query)=>{
    const review=await reviewModel.deleteOne(query);
    return review;
}

module.exports={
    createReview,
    findReview,
    deleteReview
}
