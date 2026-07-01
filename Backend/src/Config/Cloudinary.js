import {V2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    cloud_api_key:process.env.CLOUD_API_KEY,
    cloud_api_secret_key:process.env.CLOUD_API_SECRET
})

export default cloudinary;