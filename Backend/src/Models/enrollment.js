import mongoose from "mongoose";
const enrollmentschema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    module:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"modules",
    },
    stripeSessionId:{
        type:String,
        required:true,
    }

},{timestamps:true})

export const enrollment = mongoose.model("enrollment" , enrollmentschema)