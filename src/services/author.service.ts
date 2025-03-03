import { FilterQuery } from 'mongoose';
import {authorModel} from '../models/author';
import { Iauthor } from '../types/model.types';

export const createAuthor=async (input:FilterQuery<Iauthor>)=>{
    const author=await new authorModel(input).save();
    return author;
}

export const findAuthor=async (query:FilterQuery<Iauthor>)=>{
    const author = await authorModel.findOne(query);
    return author;
}

export const findAllAuthor=async()=>{
    const authors=await authorModel.find();
    return authors;
}

export const updateAuthor=async(query:FilterQuery<Iauthor>,update:Partial<Iauthor>)=>{
    const author = await authorModel.updateOne(query,update);
    return author;
}

export const deleteAuthor=async (query:FilterQuery<Iauthor>)=>{
    const author = await authorModel.deleteOne(query);
    return author;
}
