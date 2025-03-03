import { FilterQuery } from 'mongoose';
import { Icategory } from '../types/model.types';
import { categoryModel } from '../models/category';

export const createCategory = async (input:FilterQuery<Icategory>) => {
  const category = await new categoryModel(input).save();
  return category;
};

export const findCategory = async (id:any) => {
  const category = await categoryModel.findOne({_id:id});
  return category;
};

export const findAllCategory = async () => {
  const categorys = await categoryModel.find();
  return categorys;
};

export const updateCategory = async (query:FilterQuery<Icategory>, update:Partial<Icategory>) => {
  const category = await categoryModel.updateOne(query, update,{new:true});
  return category;
};

export const deleteCategory = async (query:FilterQuery<Icategory>) => {
  const category = await categoryModel.deleteOne(query);
  return category;
};