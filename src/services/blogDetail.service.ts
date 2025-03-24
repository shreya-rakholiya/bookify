import { FilterQuery } from "mongoose";
import { IblogDetail } from "../types/model.types";
import { blogDetailModel } from "../models/blogDetail";
import { query } from "express";

export const createBlogDetail=async(input:FilterQuery<IblogDetail>)=>{
    const blogDetail=await blogDetailModel.create(input)
    return blogDetail;
}

export const getBlogDetailById=async(id:string)=>{
    const blogDetail=await blogDetailModel.findById(id)
    return blogDetail;
}

export const deleteBlogDetail=async(id:string)=>{
    const blogDetail=await blogDetailModel.findByIdAndDelete(id);
    return blogDetail;
}

export const updateBlogDetail=async(query:FilterQuery<IblogDetail>,update:Partial<IblogDetail>)=>{
    const blogDetail=await blogDetailModel.findOneAndUpdate(query,update);
    return blogDetail;
}