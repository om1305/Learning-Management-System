import express from "express";
import dotenv from "dotenv";
import DBconnect from "./src/Config/DB.js";
const app = express();
dotenv.config();

app.listen(5000,()=>{
    DBconnect();
    console.log("server started");
})