import { fineModel } from "../models/fine"
import { orderModel } from "../models/order"

export const findOrder=async(fId:string,bId:string)=>{
    const order = await orderModel.findOne({fineId:fId,borrowId:bId});
    return order;
}