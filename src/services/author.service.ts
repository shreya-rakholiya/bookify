import { FilterQuery } from 'mongoose';
import {authorModel} from '../models/author';
import { Iauthor } from '../types/model.types';
import { userModel } from '../models/user';

export const createAuthor=async (input:FilterQuery<Iauthor>)=>{
    const author=await userModel.create({...input,role: 'author'});
    return author;
}

export const findAuthor=async (query:FilterQuery<Iauthor>)=>{
    const author = await userModel.findOne({...query,role: 'author'});
    return author;
}

export const findAllAuthor=async()=>{
    const authors=await userModel.find({role:'author'});
    return authors;
}

export const updateAuthor=async(query:FilterQuery<Iauthor>,update:Partial<Iauthor>)=>{
    const author = await userModel.updateOne({...query,role:'author'},update);
    return author;
}

export const deleteAuthor=async (query:FilterQuery<Iauthor>)=>{
    const author = await authorModel.deleteOne({...query,role:'author'});
    return author;
}
