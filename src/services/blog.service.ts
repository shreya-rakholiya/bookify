import { FilterQuery } from "mongoose";
import { blogModel } from "../models/blog";
import { Iblog } from "../types/model.types";

export const createBlog = async (input:FilterQuery<Iblog>) => {
  const savedBlog = await new blogModel(input).save();
  return savedBlog;
};
export const findAllBlog=async()=>{
  const blogs=await blogModel.find().lean();
  return blogs;
}
export const findBlog = async (id:any) => {
  const blog = await blogModel.find({_id:id});
  return blog;
};

export const updateBlog = async (query:FilterQuery<Iblog>, updates:Partial<Iblog>) => {
  const blog = await blogModel.updateMany(query, updates);
  return blog;
};

export const deleteBlog = async (id:any) => {
  const blog = await blogModel.findByIdAndDelete(id);
  return blog;
};

