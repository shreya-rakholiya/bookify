import Razorpay from 'razorpay';
console.log(process.env.API_KEY,"api key");
console.log(process.env.API_SECRET,"api key");
export const razorpay=new Razorpay({
    key_id:process.env.API_KEY as string,
    key_secret:process.env.API_SECRET as string
})