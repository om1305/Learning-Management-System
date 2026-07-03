import express from "express";
import { adminprotectroute, protectedRoutes } from "../Middlewares/auth.middleware.js";
import { createCourse, getAllPurchasedCourse, getCourse, getpurchaseCourse, getSingleCourse } from "../Controller/course.controller.js";
import { upload } from "../Middlewares/upload.middleware.js";


const courseRoute = express.Router();

courseRoute.post("/createCourse" , protectedRoutes , adminprotectroute , upload.single("thumbnail"),createCourse);
courseRoute.get("/getCourse" , protectedRoutes , getCourse);
courseRoute.get("/getSingleCourse/:id" , protectedRoutes , getSingleCourse);
courseRoute.get("/getPurchasedCourse/:id",protectedRoutes, getpurchaseCourse);
courseRoute.get("/getAllPurchasedCourse" , protectedRoutes , getAllPurchasedCourse)

export default courseRoute;