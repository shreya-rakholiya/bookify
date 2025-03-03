import { FilterQuery } from "mongoose";
import { reviewModel } from "../models/review";
import { Ireview } from "../types/model.types";

export const createReview=async (input:FilterQuery<Ireview>)=>{
    const review=await new reviewModel(input).save();
    return review;
};

export const findReview=async (query:FilterQuery<Ireview>)=>{
    const review=await reviewModel.find(query);
    return review;
}

export const findAllReviews=async ()=>{
    const review=await reviewModel.find();
    return review;
}

export const deleteReview=async (query:FilterQuery<Ireview>)=>{
    const review=await reviewModel.deleteOne(query);
    return review;
}
