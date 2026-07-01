import mongoose from "mongoose";
import dotenv from "dotenv";
const DBconnect = async() =>{ 
    try { 
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DB connected succesfully");
    } 
    catch (error) {
        console.log(error);
    }
}
export default DBconnect;