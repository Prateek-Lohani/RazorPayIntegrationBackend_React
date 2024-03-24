import { app } from "./app.js";
import Razorpay from 'razorpay';
import { connect } from "./config/dbConnection.js";

connect();

export const instance=new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET
}) 

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
});

