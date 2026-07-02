import { CallHuggingFaceEmbedding } from "../Config/embeddingModel.js";

const MAX_RETRIES =3;
const RETRY_DELAY_MS =1500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

export const buildCourseEmbeddingText = (course) => {
    return [
        `Title:${course.title}`,
        `Description:${course.description}`
    ].join("\n");
};

export const generateEmbedding = async(search)=>{
    if(!search || typeof search !== "string" || !search.trim()){
        throw new Error("generateEmbedding: text must be a non-empty string");
    }
    const cleanedtext = search.replace(/\s+/g," ").trim();
    
    let lastError;
    for(let attempt = 1;attempt <= MAX_RETRIES ; attempt++){
        try{
            const vector = await CallHuggingFaceEmbedding(cleanedtext);
            
            if(!Array.isArray(vector) || vector.length ===0){
                throw new Error("Embedding API returned an invalid vector");    
            }
            return vector;
        }
        catch(error){
            lastError = error;
            console.warn(`Embedding attempt ${attempt} failed : ${error.message}`);
            if(attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS*attempt);
        }
    }
    throw new Error(`generateEmbedding failed after ${MAX_RETRIES} attempts : ${lastError.message}`);
}
