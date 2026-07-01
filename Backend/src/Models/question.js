import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quiz",
        required : true,
    },
    content : {
        type : String,
        require : true,
    },
    options :[
        {
            type:String,  
        }
    ],
    correctoption :{
        type:String,
    },
    explanation:{
        type:String,
    }
},{timestamps:true})

export const question = mongoose.model("question",questionSchema);