import express from "express";
import { getUser, login, Register } from "../Controller/user.controller.js";
import { protectedRoutes } from "../Middlewares/auth.middleware.js";

const route = express.Router();

route.post('/register' , Register);
route.post('/login' , login);
route.get('/getUser' , protectedRoutes , getUser);

export default route;