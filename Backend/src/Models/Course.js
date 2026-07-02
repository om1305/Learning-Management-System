import mongoose from "mongoose";

const courseschema = new mongoose.Schema({
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
    }],
    // is embedding of that course done or not
    isIndexed:{
        type:Boolean,
        default:false,
    },
    
},{timestamps:true})

//MongoDB txt index
courseschema.index({
    title: "text",
    description:"text",
},
{
    weights:{
        title:5,
        description :1,
    },
})

export const course = mongoose.model("course" , courseschema);