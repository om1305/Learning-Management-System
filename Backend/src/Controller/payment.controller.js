import { stripe } from "../Config/stripe.js";
import {course}  from "../Models/Course.js";
import { order } from "../Models/order.js";
import { user } from "../Models/user.js";
export const createCheckOutSession = async(req,res)=>{
    try {
        const {product} = req.body;
        console.log(product);
        if(!product){
            return res.status(404).json({
                message:"provide course",
                status:false
            })
        }

        const courseId = product._id;

        const Course = await course.findById(courseId);

        if(!Course){
            return res.status(401).json({
                message:"Course Not Found",
            })
        }

        const alreadyPurchased = await order.findOne({
            user:req.user._id,
            course:courseId
        })

        if(alreadyPurchased){
            return res.status(201).json({
                message:"already Purchased"
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:[
                {
                    price_data:{
                        currency:"inr",
                        product_data:{
                            name:product.name,
                            images:[product.images],
                        },
                        unit_amount:Math.round(product.price*100)
                    },
                    quantity:1
                },
            ],
            mode:"payment",

            success_url:`${process.env.FRONTEND_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.FRONTEND_URL}/course/${courseId}`,
            metadata:{
                user:req.user._id.toString(),
                courseId : courseId,
                coursePrice:product.price,
            }
        })
        

        return res.status(201).json({
            success:true,
            sessionId:session.id,
            url:session.url,
        })
    } 
    catch (error) {
        console.log(`error in payment controller ${error}`)
    }
}

export const checkoutSuccess = async(req,res) => {
    try {
        const {sessionId} = req.body;

        if(!sessionId){
            return res.status(401).json({
                message:"Id not found",
            })
        }

        const existingOrder = await order.findOne({
            StripeSessionId:sessionId,
        })

        if(existingOrder){
            return res.status(201).json({
                message:"order already created",
            })
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "paid"){

            const courseId = session.metadata.courseId;
            const userId = session.metadata.user;

            const newOrder = new order({
                user:userId,
                course:courseId,
                totalamount:session.amount_total/100,
                StripeSessionId:sessionId,
            })

            await newOrder.save();

            await user.findByIdAndUpdate(
                userId,
                {$addToSet:{purchaseCourse:courseId}}
            )
            return res.status(201).json({
                message:"payment success",
                orderId:newOrder._id,
            })
        }
        return res.status(401).json({
            message:"Payement failed",
        })

    } catch (error) {
        console.log(`error in payment controller please check ${error}`)
    }
}