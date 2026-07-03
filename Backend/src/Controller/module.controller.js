import cloudinary from "../Config/Cloudinary.js";
import { course } from "../Models/Course.js";
import { modules } from "../Models/modules.js";

export const CreateModule = async(req,res) =>{
    try{
        const {courseId , title} = req.body;
        const video = req.file;

        if(!title || courseId){
            return res.status(401).json({
                message : "provide all details",
                status:false,
            })
        }
        if(!video){
            return res.status(401).json({
                message : "provide the videos",
                status:false,
            })
        }

        let videoURL = req.file.path;
        const PublicId = req.file.filename;

        const module = await modules.create({
            courseId,
            title,
            video:videoURL,
            videoPublicUrl : PublicId,
        })
        module.save();
        
        await course.findByIdAndUpdate(courseId,{
            $push:{Module:module._id}
        })
        return res.status(200).json(module);

    }
    catch(error){
        console.log(`error is in createModule ${error}`)
    }
} 

export const getSingleCourseModule = async(req,res) => {
    try {
        
        const moduleId = req.params.id;
    
        if(!moduleId){
            return res.status(401).json({
                message:"please provide moduleId"
            })
        }

        const singlemodule = await modules.findById(moduleId)

        if(!singlemodule){
            return res.status(401).json({
                message:"module not found",
            })
        }

        return res.status(200).json(singlemodule)
    } catch (error) {
        console.log(`error in getSingleCourseModule ${error} `)
    }
}

export const getcomment = async(req,res) => {
    try {
        const moduleId = req.params.id;

        if(!moduleId){
            return res.status(401).json({
                message:"provide module Id"
            })
        }

        const moduleComment = await modules.findById(moduleId).populate({
            path:"comment",
            populate:{
                path:'userId',
                select:"fullName email",
            },
            options : {sort:{createdAt:-1}}
        });
        return res.status(200).json(moduleComment)
    } catch (error) {
        console.log(`error in getcomment ${error}` )
    }
}