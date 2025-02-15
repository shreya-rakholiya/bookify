const contactModel = require("../models/contact");

const createContact=async(input)=>{
    const contact=await new contactModel(input).save();
    return contact;
}

const findContact=async(query)=>{
    const contact=await contactModel.find(query);
    return contact;
}

const findAllContact=async()=>{
    const contacts=await contactModel.find();
    return contacts;
}

const deleteContact=async(query)=>{
    const contact = await contactModel.deleteOne(query);
    return contact;
}

module.exports={
    createContact,
    findContact,
    deleteContact,
    findAllContact
}