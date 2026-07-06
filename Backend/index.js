import "dotenv/config";
import express from "express";
import DBconnect from "./src/Config/DB.js";
import route from "./src/Routes/user.route.js";
import cookieParser from "cookie-parser";
import courseRoute from "./src/Routes/course.route.js";
import moduleRoute from "./src/Routes/module.route.js";
import cors from "cors";
import PaymentRoute from "./src/Routes/payment.route.js";
import analyticRoute from "./src/Routes/analytic.route.js";
import { getCourseCollection } from "./src/Config/ChromaDB.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://learning-management-system-txvn.onrender.com"
    ],
    credentials: true,
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/user' , route);
app.use('/api/user/course',courseRoute);
app.use('/api/user/module',moduleRoute);
app.use('/api/user/payment',PaymentRoute);
app.use('/api/user/analytic',analyticRoute);

app.listen(process.env.PORT,async()=>{
    DBconnect();
    // console.log(import.meta.env.VITE_BASE_URL);
    console.log("server started");
})