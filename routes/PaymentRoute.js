import express from 'express';
import checkOut, { paymentVerification } from '../controllers/PayementController.js';

const router=express.Router();

router.route('/checkout').post(checkOut);
router.route('/paymentVerification').post(paymentVerification);

export default router;