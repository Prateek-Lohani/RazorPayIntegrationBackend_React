import { Payment } from "../models/PaymentModel.js";
import { instance } from "../server.js";
import CryptoJS from "crypto-js";

const checkOut=async(req,res)=>{

    var options = {
        amount: Number(req.body.amount*100),  // amount in the smallest currency unit
        currency: "INR",
      };
      const order= await instance.orders.create(options);

      res.status(200).json({
        success:true,
        order
      })

      

}

export const paymentVerification=async(req,res)=>{

  console.log(req.body)

  const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body;

  const generated_signature = CryptoJS.HmacSHA256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET);

  if (generated_signature == razorpay_signature) {
    console.log("Payment successfully verified");

    await Payment.create({
      razorpay_order_id,razorpay_payment_id,razorpay_signature
  })

    // res.redirect(`https://razorpayreact.netlify.app/paymentSuccess/?${razorpay_payment_id}`)

  }else{
    
    res.status(!200).json({
      success:false
    })

  }

     

}


export default checkOut;
