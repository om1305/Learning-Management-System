import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { course } from "../src/Models/Course.js";
import { indexCourse } from "../src/Services/indexing.service.js";

await mongoose.connect(process.env.MONGO_DB_URL);

console.log("MongoDB Connected");

const courses = await course.find();

console.log(`Found ${courses.length} courses`);

for (const c of courses) {
    console.log(`Indexing: ${c.title}`);
    await indexCourse(c);
}

console.log("✅ All courses indexed");

await mongoose.disconnect();
process.exit(0);