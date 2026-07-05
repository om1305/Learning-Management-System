import mongoose, { Types } from "mongoose";

const userschema = new mongoose.Schema({
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
    admin:{
        type:Boolean,
        default:false
    },
    purchaseCourse: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    }],
    default: []
}

},{timestamps:true})

export const user = mongoose.model("user" , userschema);