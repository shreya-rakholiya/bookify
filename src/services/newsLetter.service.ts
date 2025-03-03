import { FilterQuery } from 'mongoose';
import { InewsLetter } from '../types/model.types';
import { newsLetterModel } from '../models/newsLetter';

export const createNewsLetter=async(input:FilterQuery<InewsLetter>)=>{
    const newsLetter=await new newsLetterModel(input).save();
    return newsLetter;
}

export const findNewsLetter=async(query:FilterQuery<InewsLetter>)=>{
    const newsLetter=await newsLetterModel.find(query);
    return newsLetter;
}

export const findAllNewsLetter=async()=>{
    const newsLetter=await newsLetterModel.find();
    return newsLetter;
}

export const deleteNewsLetter=async(nId:any)=>{
    const newsLetter=await newsLetterModel.findByIdAndDelete({_id:nId})
    return newsLetter;
}