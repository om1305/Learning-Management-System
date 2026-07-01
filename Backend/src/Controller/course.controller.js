import cloudinary from "../Config/Cloudinary.js";
import { course } from "../Models/Course.js";

export const createCourse = async(req,res) =>{
    try{
        const {title , description , amount} = req.body;
        if(!title || !description || !amount){
            return res.status(400).json({
                message:"provide all the details"
            })
        }
        const thumbnail = req.file;
        if(!thumbnail){
            return res.status(400).json({
                message:"thumbnail required please provide",
                success:false
            })
        }
        const imageURL = "";

        //convert buffer to base64
        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;

        //upload to cloudinary
        const uploadRes = await cloudinary.uploader.upload(base64,{
            folder:"LMSYT",
        })
        imageURL = uploadRes.secure_url;

        const newcourse = new course.create({
            userId:req.user._id,
            title,
            description,
            amount,
            thumbnail:imageURL,
        })
        await newcourse.save();
        return res.status(201).json({
            message:"Course created successfully",
            newcourse,
            success:true,
        })
         
    }catch(error){
        console.log(`error in course ${error}`);
    }
}

export const getCourse = async(req,res) => {
    try{
        const {search} = req.query;
        if(!search || !search.trim()===""){
            const allCourses = await course.find({});
            return res.status(201).json(allCourses);
        }
    }catch(error){
        console.log(`error is in getCourse ${error}`)
    }
}