import "dotenv/config";
import express from "express";
import DBconnect from "./src/Config/DB.js";
import route from "./src/Routes/user.route.js";
import cookieParser from "cookie-parser";
import courseRoute from "./src/Routes/course.route.js";
import moduleRoute from "./src/Routes/module.route.js";
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api' , route);
app.use('/api/course',courseRoute);
app.use('/api/module',moduleRoute);

app.listen(process.env.PORT,()=>{
    DBconnect();
    console.log("server started");
})