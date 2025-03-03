import { razorpay } from "../config/razorpay.config"

export const createRazorpayOrder=async (amount:number):Promise<string> => {
    const options={
        amount: amount*100,
        currency:'INR',
        receipt:`receipt_${Date.now()}`,
    }
    console.log(options,"options");
    
    const order=await razorpay.orders.create(options);
    console.log(order,"orderrrssssdddd");
    
    return order.id;
}

// export const verifyPayment=async(razorpayOrderId:string,razorpayPaymentId:string):Promise<boolean>=>{
//     const payment=await razorpay.payments.fetch(razorpayPaymentId);
//     console.log(payment,"heleee");
//     if (payment.status === 'created') {
//         try {
//             console.log("Attempting to capture payment before refund...");
//             const capturedPayment = await razorpay.payments.capture(
//                 razorpayPaymentId, 
//                 payment.amount,
//                 'INR'
//             );
//             console.log("Payment captured successfully:", capturedPayment.status);
//         } catch (captureError) {
//             console.error("Failed to capture payment:", captureError.message);
//             // Continue with refund attempt anyway
//         }
//     }
//     // console.log(razorpayOrderId,"hanumanji order id");
    
//     return payment.order_id === razorpayOrderId && payment.status === 'captured' ;
// }

export const verifyPayment = async(razorpayOrderId: string, razorpayPaymentId: string): Promise<boolean> => {
    // First, fetch the payment
    const payment = await razorpay.payments.fetch(razorpayPaymentId);
    console.log("Payment status before capture:", payment.status);
    
    // If payment is in 'created' or 'authorized' state, capture it
    if (payment.status === 'created' || payment.status === 'authorized') {
        try {
            console.log("Attempting to capture payment...");
            const capturedPayment = await razorpay.payments.capture(
                razorpayPaymentId, 
                payment.amount,
                payment.currency || 'INR'
            );
            console.log("Payment captured successfully:", capturedPayment.status);
            
            // Return success only if the payment is now captured and matches the order ID
            return capturedPayment.order_id === razorpayOrderId && capturedPayment.status === 'captured';
        } catch (captureError) {
            console.error("Failed to capture payment:", captureError);
            return false;
        }
    }
    
    // If payment is already captured, just check the order ID
    return payment.order_id === razorpayOrderId && payment.status === 'captured';
}

