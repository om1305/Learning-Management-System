import express from "express";
import { getUser, login, logout, Register } from "../Controller/user.controller.js";
import { protectedRoutes } from "../Middlewares/auth.middleware.js";

const route = express.Router();

route.post('/register' , Register);
route.post('/login' , login);
route.get('/getUser' , protectedRoutes , getUser);
route.post('/logout',protectedRoutes,logout);

export default route;