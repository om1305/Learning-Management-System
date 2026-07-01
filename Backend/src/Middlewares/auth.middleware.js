import jwt from "jsonwebtoken";
import {user} from "../Models/user.js";

export const protectedRoutes = async(req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1] ;
//         const token =
//   req.cookies.token ||
//   req.headers.authorization?.split(" ")[1]; 
        if(!token){
            return res.status(401).json({
                message:"token is missing",
            })
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message:"token invalid",
            })
        }
        const newuser = await user.findById(decode.user).select('-Password');
        if(!newuser){
            return res.status(401).json({
                message:"user not found",
                success:false
            })
        }
        req.user = newuser;
        next();
    }catch(error){
        console.log(`error in protectedRoutes backend ${error}`);
    }
}

export const adminprotectroute = async(req,res,next)=>{
    try {
        if(req.user && req.user.email===process.env.EMAIL){
            next();
        }
    } catch (error) {
        console.log(`error from adminprotectedroute ${error}`);
    }
}