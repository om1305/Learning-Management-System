import cloudinary from "../Config/Cloudinary.js";
import {course}  from "../Models/Course.js";
import { user } from "../Models/user.js";
import { HybridSearch } from "../Services/hybridSearch.service.js";

export const createCourse = async(req,res) =>{
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);
    console.log(process.env.CLOUD_NAME);
console.log(process.env.CLOUD_API_KEY);
console.log(process.env.CLOUD_API_SECRET);
    console.log(cloudinary);
    try{
        const {title , description , amount} = req.body;
        if(!title || !description || !amount){
            return res.status(400).json({
                message:"provide all the details"
            })
        }
        let thumbnail = req.file;
        if(!thumbnail){
            return res.status(400).json({
                message:"thumbnail required please provide",
                success:false
            })
        }
        let imageURL = "";

        //convert buffer to base64
        const base64 = `data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`;

        //upload to cloudinary
        const uploadRes = await cloudinary.uploader.upload(base64,{
            folder:"LMSYT",
        })
        imageURL = uploadRes.secure_url;

        const newcourse = await course.create({
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
        if(!search || !search.trim() === ""){
            const allCourses = await course.find({});
            return res.status(201).json(allCourses);
        }
        // AI FEATURE
        const result = await HybridSearch(search.trim());

        // return res.status(200).json({
        //     success:true,
        //     search,
        //     count:result.length,
        //     data: result,
        // }) 
        return res.status(200).json(result);

    }catch(error){
        console.log(`error is in getCourse ${error}`)
    }
}

export const getSingleCourse = async(req,res) => {
    try{
        const courseId = req.params.id;
        const singlecourse = await course.findById(courseId).populate("modules")

        if(!singlecourse){
            return res.status(401).json({
                message:"Course not found",
            })
        }

        return res.status(201).json(singlecourse);

    }catch(error){
        console.log(`error is in singlecourse ${error}`);
    }
}

//provide single course 
//like when we click on the course we will call this single function to get the course by id
export const getpurchaseCourse = async(req,res) => {
    try {
        
        const courseId = req.params.id;
        if(!courseId){
            return res.status(401).json({
                message:"no course found",
            })
        }
        const purchasedcourse = await course.findById(courseId).populate("modules")

        if(!purchasedcourse){
            return res.status(401).json({
                message:"no purchase course",
            })
        }

        return res.status(201).json(purchasedcourse);

    } catch (error) {
        console.log(`from purchased course ${error}`)
    }
}

//we get all purchased course
export const getAllPurchasedCourse = async(req,res) =>{
    try {
        
        const userId = req.user._id;
        
        const User = await user.findById(userId).populate("purchaseCourse")

        if(!User){
            return res.status(401).json({
                message:"User not found",
            })
        }

        return res.status(201).json(User);
    } catch (error) {
        console.log(`error in getAllPurchasesCourse ${error}`);
    }
}