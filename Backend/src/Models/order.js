import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    totalamount:{
        type : Number,
        require:true,
    },
    StripeSessionId:{
        type:String,
        require:true,
    }

},{timestamps:true})

export const order = mongoose.model("order" , orderSchema);
