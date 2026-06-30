import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    moduleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"module",
    },
    comments:[{
        type:String,
        required : true,
    }]
},{timestamps:true})

export const comment = mongoose.model("comment",commentSchema);