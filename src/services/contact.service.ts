import { FilterQuery } from 'mongoose';
import {contactModel} from '../models/contact';
import { Icontact } from '../types/model.types';

export const createContact=async(input:FilterQuery<Icontact>)=>{
    const contact=await new contactModel(input).save();
    return contact;
}

export const findContact=async(query:FilterQuery<Icontact>)=>{
    const contact=await contactModel.find(query);
    return contact;
}

export const findAllContact=async()=>{
    const contacts=await contactModel.find();
    return contacts;
}

export const deleteContact=async(cId:any)=>{
    const contact = await contactModel.deleteOne({_id:cId});
    return contact;
}
