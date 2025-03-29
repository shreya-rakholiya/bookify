import { ObjectId, Types } from "mongoose";
import { razorpay } from "../config/razorpay.config";
import { subscriptionPlanModel } from "../models/subscriptionPlan";
import { ISubscriptionPlan } from "../types/model.types";
import { userModel } from "../models/user";
import { orderModel } from "../models/order";
import { subscriptionModel } from "../models/subscription";
import subscriptions from "razorpay/dist/types/subscriptions";
interface Ioptions {
  period: string;
  interval: number;
  item: {
    name: string;
    description: string;
    amount: number;
    currency: string;
  };
}

// This is a helper function to create a subscription plan in Razorpay
export const createRazorpayPlan = async (
  plan: ISubscriptionPlan
): Promise<string> => {
  const options: any = <Ioptions>{
    period: "monthly",
    interval: plan.durationMonth,
    item: {
      name: plan.name,
      description: plan.description,
      amount: plan.price * 100,
      currency: "INR",
    },
  };
  try {
    const razorpayPlan = await razorpay.plans.create(options);
    return razorpayPlan.id;
  } catch (err) {
    console.log("Error creating Razorpay plan:", err);
    throw new Error(`Error creating subscription plan Razorpay `);
  }
};

//Create a subscription on Razorpay
export const createRazorpaySubscription = async (
  planId: string,
  customerId: string,
  totalCount: number
): Promise<any> => {
  const options: any = {
    plan_id: planId,
    customer_id: customerId,
    total_count: totalCount || 12, //default to 12 cycles if not specified
    customer_notify: 1,
  };

  try {
    const subscription = await razorpay.subscriptions.create(options);
    return subscription;
  } catch (err) {
    console.log("Error creating RazorPay subscription", err);
    throw new Error(`Error creating subscription Razorpay `);
  }
};

//create Razorpay customer (needed for subscription)
export const createRazorpayCustomer = async (
  name: string,
  email: string
): Promise<any> => {
  try {
    const allCustomers = await razorpay.customers.all({});

    // Filter customers by email manually
    const existingCustomer = allCustomers.items.find(
      (customer: any) => customer.email === email
    );

    if (existingCustomer) {
      return existingCustomer.id;
    }

    const customer = await razorpay.customers.create({
      name,
      email,
      contact: "", //Optional , you can add phorn if available
      notes: {
        source: "Bookify Library Management System",
      },
    });
    return customer.id;
  } catch (err) {
    console.log("Error creating Razorpay customer", err);
    throw new Error("Failed to create customer on Razorpay");
  }
};

//Main subscription service methods
export const createSubscriptionPlan = async (
  planData: Partial<ISubscriptionPlan>
) => {
  try {
    const plan = await subscriptionPlanModel.create(planData);
  } catch (err) {
    console.log("Error", err);
    throw new Error(`Failed to create subscription plan: ${err.message}`);
  }
};

export const getAllSubscriptionPlans = async (activeOnly: boolean = true) => {
  try {
    return await subscriptionPlanModel.find();
  } catch (err) {
    throw new Error(
      `Failed to fetch subscription plans:${(err as Error).message}`
    );
  }
};

export const initiateSubscription = async (
  userId: ObjectId,
  planId: ObjectId
) => {
  try {
    const user = await userModel.findById(userId);
    const plan = await subscriptionPlanModel.findById(planId);
console.log(user,"userrrrr");
console.log(plan,"plannnn");


    if (!user || !plan) {
      throw new Error("User or plan not found");
    }
    // Create Razorpay customer if not already created
    // In a real app, you'd store this ID with the user
    const customerId = await createRazorpayCustomer(user.firstName, user.email);

    //create Razorpay plan
    const razorpayPlanId = await createRazorpayPlan(plan);

    //create Razorpay subscription
    const razorpaySubscription = await createRazorpaySubscription(
      razorpayPlanId,
      customerId,
      1
    ); //Intially create for 1 cycle)

     // Fetch the subscription status from Razorpay
     const subscriptionDetails = await razorpay.subscriptions.fetch(
      razorpaySubscription.id
    );

    // console.log(subscriptionDetails, "Subscription Details from Razorpay");

    // if (subscriptionDetails.status !== "completed") {
    //   throw new Error(
    //     `Subscription not active. Current status: ${subscriptionDetails.status}`
    //   );
    // }

    //Calculate end date based on plan duration
    const startDate=new Date();
    const endDate=new Date();
    endDate.setMonth(endDate.getMonth()+plan.durationMonth)

    
    //create subscription order
    const order=await orderModel.create({
      user,
      amount:plan.price,
      paymentType:'subscription',
      razorpayOrderId:razorpaySubscription.id,
      status:'pending'
    })

    const subscription=await subscriptionModel.create({
      userId,
      planId,
      startDate,
      endDate,
      razorpaySubscriptionId:razorpaySubscription.id,
      status:'active'
    })
    return {order,subscription,razorpaySubscription}
  } catch (err) {
    throw new Error(`Failed to initiate subscription:${(err as Error).message}`)
  }
};

export const verifySubscriptionPayment=async(subscriptionId:string,razorpayPaymentId:string)=>{

  try{
    console.log(razorpayPaymentId,"payment id",subscriptionId,"subscription id");
    
    const payment=await razorpay.payments.fetch(razorpayPaymentId);
    console.log(payment,"jdsifuhsa");
    
    if (payment.status!== 'captured') {
      throw new Error(`Payment not captured`);
    }

    //Update subscription status
    const subscription=await subscriptionModel.findOneAndUpdate(
      {razorpaySubscriptionId:subscriptionId},
      {status:'active'},
      {new:true}
    );
    if(!subscription){
      throw new Error(`subscription not found`);
    }

    //update order status

    await orderModel.findOneAndUpdate(
      {razorpayOrderId:subscriptionId},
      {status:'completed',
        razorpayPaymentId
      },
    );

    await userModel.findOneAndUpdate({_id:subscription.userId},{isSubscribed:true})

    return subscription;
  }catch(err){
    console.log("Error verifying Razorpay payment", err);
    throw new Error(`Failed to verify payment on Razorpay :${(err as Error).message}`);
  }
}

export const cancelSubscription=async(subscriptionId:string)=>{
  try{
    const subscription = await subscriptionModel.findOne({razorpaySubscriptionId:subscriptionId});
    if(!subscription){
      throw new Error("Subscription not found");
    }

    //Cancel on Razorpay
    await razorpay.subscriptions.cancel(subscription.razorpaySubscriptionId,{cancel_at_cycle_end:true});

    //Update subscription
    subscription.status='cancelled';
    subscription.autoRenew=false;
    await subscription.save();
    
    return subscription;
  }catch(err){
    console.log("Error cancelling subscription", err);
    throw new Error(`Failed to cancel subscription: ${(err as Error).message}`);
  }
}

export const getUserActiveSubscription=async(userId:ObjectId)=>{
  try{
    const userSubscription=await subscriptionModel.findOne({userId,status:'active',endDate:{$gt:new Date()}})
    .populate('planId')
    .populate({
      path:'userId',
      populate:({
        path:'profile'
      })
    })
    .lean()
    // console.log(userSubscription,"userSubscription");
    
    return userSubscription;
  }catch(err){
    throw new Error(`Failed to fetch user subscription:${(err as Error).message}`);
  }
}

//Handle Razorpay webhooks for subscription events
export const handlesubscriptionWebhook=async(event:any)=>{
  try{
    const {payload}=event;

    switch(event.event){
      case 'subscription.activated':
        await subscriptionModel.findOneAndUpdate(
          {razorpaySubscriptionId:payload.subscription.entity.id},
          {status:'active'}
        )
        break;
      
      case 'subscription.completed':
        await subscriptionModel.findOneAndUpdate(
          {razorpaySubscriptionId:payload.subscription.entity.id},
          {status:'expired'}
        )
        break;
      
      case 'subscription.cancelled':
        await subscriptionModel.findOneAndUpdate({
          razorpaySubscriptionId:payload.subscription.entity.id
          },
          {status:'expired'}
        )
        break;
      
      case 'subscription.charged':
        //handle successful renewal payment
        const subscription=await subscriptionModel.findOne(
          {razorpaySubscriptionId:payload.subscription.entity.id}
        )
        if(subscription){
          //update subscription end date
          const newEndDate = new Date(subscription.endDate);
          const plan=await subscriptionPlanModel.findById(subscription.planId)
          if(plan){
            newEndDate.setMonth(newEndDate.getMonth()+plan.durationMonth)
            subscription.endDate=newEndDate;
            await subscription.save()
          }
        }
        break;
        
    }
    return true;
  }catch(err){
    console.log('Error handling subscription webhook:',err);
      throw new Error(`Failed to process subscription webhook:${(err as Error).message}`);
  }
}

export const getSubscriptionPlanById=async(sId:ISubscriptionPlan["_id"])=>{
  const subscriptionPlan=await subscriptionPlanModel.findById(sId);
  return subscriptionPlan;
}