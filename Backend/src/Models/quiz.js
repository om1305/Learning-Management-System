import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    moduleId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "module",
    },
    questions:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"question"
        }
    ],


},{timestamps:true})

export const quiz = mongoose.model("quiz",quizSchema);