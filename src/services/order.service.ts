import { FilterQuery } from "mongoose";
import { fineModel } from "../models/fine"
import { orderModel } from "../models/order"
import { Iorder } from "../types/model.types";

export const findOrder=async(bId:string)=>{
    const order = await orderModel.findOne({borrowId:bId});
    return order;
}

export const createOrder=async(input:FilterQuery<Iorder>)=>{
    const order=await orderModel.create(input);
    return order;
}