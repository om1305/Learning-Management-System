import express from "express";
import dotenv from "dotenv";
import DBconnect from "./src/Config/DB.js";
import route from "./src/Routes/user.route.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api' , route);

app.listen(process.env.PORT,()=>{
    DBconnect();
    console.log("server started");
})