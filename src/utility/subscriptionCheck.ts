import { subscriptionModel } from "../models/subscription"
import { updateSubscription } from "../services/subscription.service"
import { updateUser } from "../services/user.service"

export const checkSubscription=async()=>{
    const expireSubscription=await subscriptionModel.find({
        endDate:{
            $lt:new Date()
        }
    })
    if(!expireSubscription.length || expireSubscription.length>=0){
        for(let s of expireSubscription){
            await updateSubscription({_id:s._id,status:"active"},{status:"expired"})

            await updateUser({_id:s.userId,isSubscribed:true},{isSubscribed:false})
            console.log("update")
        }
    }
}