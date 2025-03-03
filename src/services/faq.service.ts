import { FilterQuery } from 'mongoose';
import {faqModel} from '../models/faq';
import { Ifaq } from '../types/model.types';

export const createFaq=async(input:FilterQuery<Ifaq>)=>{
    const faq=await new faqModel(input).save();
    return faq;
}

export const findAllfaq=async()=>{
    const faqs=await faqModel.find();
    return faqs;
}

export const deleteFaq=async(fId:any)=>{
    const faq=await faqModel.deleteMany({_id:fId});
    return faq;
}

export const updateFaq = async (
  query: FilterQuery<Ifaq>,
  update: Partial<Ifaq>
) => {
  const book = await faqModel.updateOne(query, update, { new: true });
  return book;
};