import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    CourseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"course",
    },
    video:{
        //cloudinary data
        type:String,
        required : true,
    },
    title:{
        type:String,
        required : true
    },

    quiz : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"quiz",
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "comment"
    }
    ]
},{timestamps:true})

export const modules = mongoose.model("modules",moduleSchema);