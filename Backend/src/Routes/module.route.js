import express from "express";
import { adminprotectroute, protectedRoutes } from "../Middlewares/auth.middleware.js";
import { CreateModule, getcomment, getSingleCourseModule } from "../Controller/module.controller.js";
import { videoUpload } from "../Middlewares/video_upload.middleware.js";
const moduleRoute = express.Router();

moduleRoute.post('/createmodule',protectedRoutes,adminprotectroute,videoUpload.single("video"),CreateModule);
moduleRoute.get('/getsinglemodule/:id',protectedRoutes , getSingleCourseModule);
moduleRoute.get('/getcomments/:id',protectedRoutes,getcomment);

export default moduleRoute;