import { FilterQuery } from "mongoose";
import { userModel } from "../models/user";
import { Iuser } from "../types/model.types";
import { fineModel } from "../models/fine";
import path from "path";

export const createUser=async(input:FilterQuery<Iuser>)=>{
    const user=await new userModel(input).save();
    return user;
}

export const findAllUser=async()=>{
    const users=await userModel.find();
    return users;
}

export const findUser=async(query:FilterQuery<Iuser>)=>{
    console.log(query,"servicesss");
    const user=await userModel.findOne(query).lean();
    return user;
}

export const updateUser=async(query:FilterQuery<Iuser>,update:Partial<Iuser>)=>{
    const user=await userModel.updateOne(query,update);
    return user;
}

export const deleteUser=async(query:FilterQuery<Iuser>)=>{
    const user=await userModel.deleteMany(query);
    return user;
}

export const getProfile=async(id:string,role:string)=>{
    const admin=await userModel.find({_id:id,role})
    .populate('profile')
    return admin;
}

export const updateProfile=async(id:string,role:string,update:Partial<Iuser>)=>{
    const admin=await userModel.updateOne({_id:id,role},update)
    return admin;
}

export const findBorrowedBookOfUser=async(userId:string)=>{
    const borrowedBooks=await userModel.findById(userId)
    .select('borrowedBooks')
    .populate({path:'borrowedBooks',
        match: { status: 'active' },
        populate:{
            path:'bookId'
        }
    })
    .lean()
    return borrowedBooks;
}

export const findreturnedBorrowBookOfUser=async(userId:string)=>{
    const borrowedBooks=await userModel.findById(userId)
    .select('borrowedBooks')
    .populate({path:'borrowedBooks',
        match: { status: 'returned' },
        populate:{
            path:'bookId'
        }
    })
    .lean()
    return borrowedBooks;
}

export const findFineOfUser=async(userId:string)=>{
    const fine=await fineModel.find({user:userId})
}