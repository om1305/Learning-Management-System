import express from "express";
import { protectedRoutes } from "../Middlewares/auth.middleware.js";
import { checkoutSuccess, createCheckOutSession } from "../Controller/payment.controller.js";


const PaymentRoute = express.Router();

PaymentRoute.post('/checkout' , protectedRoutes , createCheckOutSession);
PaymentRoute.post('/checkout-success' , protectedRoutes , checkoutSuccess);

export default PaymentRoute;