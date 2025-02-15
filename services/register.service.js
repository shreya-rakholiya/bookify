const { query } = require("express");
const registerModel = require("../models/registration")

const createUser=async(input)=>{
    const user=await new registerModel(input).save();
    return user;
}

const findAllUser=async()=>{
    const users=await registerModel.find();
    return users;
}

const findUser=async(query)=>{
    const user=await registerModel.findOne(query).lean();
    return user;
}

const updateUser=async(query,update)=>{
    const user=await registerModel.updateOne(query,update);
    return user;
}

const deleteUser=async(query)=>{
    const user=await registerModel.deleteMany(query);
    return user;
}

module.exports={
    createUser,
    findUser,
    findAllUser,
    updateUser,
    deleteUser
}