import { getCourseCollection } from "../Config/ChromaDB";
import { course } from "../Models/Course"
import { buildCourseEmbeddingText, generateEmbedding } from "./embedding.service";

export const indexCourse = async(Course)=>{
    try {
        const collection = await getCourseCollection();
        const embeddingtext = buildCourseEmbeddingText(Course);
        const vector = await generateEmbedding(embeddingtext);

        await collection.upsert({
            ids : [Course._id.toString()],
            embeddings : [vector],
            documents : [embeddingtext],
            metadatas: [{
                courseId : Course._id.toString(),
                title:Course.title,
                description:Course.description,
                thumbnail: Course.thumbnail || "",
            }]
        });
        await course.findByIdAndUpdate(Course._id , {isIndexed:true});
        console.log(`Indexed course in chromaDB : ${Course._id}`);

    } catch (error) {
        console.log(`Failed to index course ${Course._id} : ${error.message}`);
    }
}

export const reindexCourse = async(Course) => {
    return indexCourse(Course);
}

export const deleteCourseFromIndex = async(courseId) => {
    try {
        const collection = await getCourseCollection();
        await collection.delete({ids:[courseId.toString()]});
        console.log(`Removed course from chromaDB index : ${courseId}`);
    } catch (error) {
        console.log(`Failed to removed course from chromaDB index : ${courseId}, ${error.message}`);
    }
}