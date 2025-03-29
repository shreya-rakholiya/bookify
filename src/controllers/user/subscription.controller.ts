import { Response } from "express";
import { Request } from "../../types/request";
import { cancelSubscription, createSubscriptionPlan, getAllSubscriptionPlans, getUserActiveSubscription, handlesubscriptionWebhook, initiateSubscription, verifySubscriptionPayment } from "../../services/subscription.service";
import { ObjectId, Types } from "mongoose";
import { subscriptionModel } from "../../models/subscription";
import { updateUser } from "../../services/user.service";

export const createSubscriptionPlanController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const authId=req.authuserId;

        const planData=req.body;
        const subscription=await subscriptionModel.find({userId:authId,status:{$ne:'cancelled'}});
        if(subscription){
            return res.status(400).json({
                success:false,
                message:"User already has a subscription"
            })
        }
        const plan=await createSubscriptionPlan(planData);
        res.status(201).json({
  success:true,
            data:plan
        })
    }catch(err){
        res.status(400).json({message:err.message,
            successs:false});
    }
}

export const getSubscriptionPlanController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const plans = await getAllSubscriptionPlans();
        if(!plans) {
            return res.status(404).json({
                success:false,
                message:"No subscription plans found"
            })
        }
        res.status(200).json({success:true,data:plans})
    }catch(err){
        res.status(500).json({err:err.message,successs:false});
    }
}

export const initiateSubscriptionController=async(req:Request,res:Response):Promise<any>=>{
    try{
        const authUserId=req.authuserId as ObjectId;
        console.log(authUserId,"auhttrg");
        const user=req.authUser;
        if (user.isSubscribed==true) {
            return res.status(403).json({
                message:"You already have subscription"
            })
        }

        const {planId}=req.body
        const result=await initiateSubscription(authUserId,planId);
        res.status(200).json({success:true,data:result});
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
}

export const verifySubscriptionPaymentController=async(req:Request,res:Response)=>{
    try{
        const {subscriptionId,razorpayPaymentId}=req.body;
        const result=await verifySubscriptionPayment(subscriptionId,razorpayPaymentId);
        res.status(200).json({success:true,data:result});
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
}

export const cancelSubscriptionController=async(req:Request,res:Response)=>{
    try{
        const authUserId=req.authuserId
        const {subscriptionId}=req.params;
        const result=await cancelSubscription(subscriptionId);
        if(result){
            await updateUser({_id:authUserId},{isSubscribed:false})
        }
        res.status(200).json({success:true,data:result})
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
}

export const getUserSubscriptionCpntroller=async(req:Request, res:Response)=>{
    try{
        const {userId}=req.params;
        const subscription=await getUserActiveSubscription(userId)
        
        res.status(200).json({success:true,data:subscription})
    }catch(err){
        res.status(404).json({success:false,error:err.message});
    }
}


export const handleWebhook=async(req:Request,res:Response)=>{
    try{
         // Verify webhook signature (important in production)
    // const signature = req.headers['x-razorpay-signature'];
    // Verify using Razorpay's utility (not shown here for simplicity)

    await handlesubscriptionWebhook(req.body);
    res.status(200).json({success:true,message:`webhook processed successfully`});
    }catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}

