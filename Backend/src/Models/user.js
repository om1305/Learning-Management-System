import mongoose, { Types } from "mongoose";

const userschema = mongoose.Schema({
    fullName:{
        type : String,
        require:true
    },
    email:{
        type : String,
        require : true,
        unique : true
    },
    Password:{
        type : String,
        require : true
    },
    purchaseCourse:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Course"

    }

},{timesstamps:true})

export const user = mongoose.model("user" , userschema);