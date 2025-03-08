import { Response } from "express";
import { Request } from "../../types/request";
import { cancelSubscription, createSubscriptionPlan, getAllSubscriptionPlans, getUserActiveSubscription, handlesubscriptionWebhook, initiateSubscription, verifySubscriptionPayment } from "../../services/subscription.service";

export const createSubscriptionPlanController=async(req:Request,res:Response)=>{
    try{
        const planData=req.body;
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

export const getSubscriptionPlanController=async(req:Request,res:Response)=>{
    try{
        const activeOnly=req.query.activeOnly !== 'false';
        const plans = await getAllSubscriptionPlans(activeOnly);
        res.status(200).json({success:true,data:plans})
    }catch(err){
        res.status(500).json({err:err.message,successs:false});
    }
}

export const initiateSubscriptionController=async(req:Request,res:Response)=>{
    try{
        const {userId,planId}=req.body
        const result=await initiateSubscription(userId,planId);
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
        const {subscriptionId}=req.params;
        const result=await cancelSubscription(subscriptionId);
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

