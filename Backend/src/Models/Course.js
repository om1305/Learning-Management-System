import mongoose from "mongoose";

const courseschema = mongoose.Schema({
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        required:true
    },
    description : {
        type:String,
        required : true,
    },
    thumbnail :{
        //cloudinary use
        type:String,
    },
    amount:{
        type:Number,
        require:true,
    },
    modules:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"modules",
    }]
    
},{timestamps:true})

export const course = mongoose.model("course" , courseschema);