import {user} from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req,res) =>{
    try{
        const {fullName , email , Password} = req.body;

        if(!fullName || !email || !Password){
            return res.status(401).json({
                message:"user details not complete",
            })
        }
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message:"user already exist",
            })
        }
        const HashedPassword = await bcrypt.hash(Password , 7);

        const newuser = await user.create({
            fullName,
            email,
            Password:HashedPassword
        });

        const token = jwt.sign({user:newuser._id} , process.env.JWT_SECRET_KEY , { expiresIn: "1d" });

        if(newuser.email === process.env.EMAIL){
            return res.status(201).cookie("token", token ,{maxAge:1*24*60*60*1000 ,httpOnly:true , secure:true , sameSite:"none"}).json({
                message:`Welcome Admin ${newuser.fullName}`, 
            })
        }

        return res.status(201).cookie("token", token ,{maxAge:1*24*60*60*1000 ,httpOnly:true , secure:true , sameSite:"none"}).json({
                message:`Welcome ${newuser.fullName}`, 
            })
    } catch(error){
        console.log(`issue in register function backend ${error}`);
    }
} 

export const login = async (req,res) =>{
    try{
        const {email , Password} = req.body;
    
        if(!email || !Password){
            return res.status(401).json({
                message : "incomplete user details"
            })
        }
    
        const existuser = await user.findOne({email });
        if(!existuser){
            return res.status(401).json({
                message:"error in pass or email",
            })
        }
        const isPasswordcorrect = await bcrypt.compare(Password , existuser.Password);
        if(!isPasswordcorrect){
            return res.status(401).json({
                message:"error in pass or email",
            })
        }
        if(existuser.email === process.env.EMAIL){
            existuser.admin = true;
            await existuser.save();
        }
        const token = jwt.sign({user:existuser._id} , process.env.JWT_SECRET_KEY , { expiresIn: "1d" });
        res.cookie("token" , token , {
            maxAge: 1*24*60*60*1000,
            httpOnly:true,
            sameSite:"none",
            secure:true
        })
        if(existuser.admin){
            return res.status(201).json({
                message: `welcome back admin ${existuser.fullName}`,
            })
        }
        return res.status(201).json({
                message: `welcome back ${existuser.fullName}`,
            })


    }catch(error){
        console.log(`the issue is in login function backend ${error}`);
    }
    
}

export const getUser = async(req,res)=>{
    try {
        const userId = req.user._id;
        const newuser = await user.findById(userId);
        if(!newuser){
            return res.status(401).json({
                message:"user not found",
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(`error in getUser function backend ${error}`);
    }
}