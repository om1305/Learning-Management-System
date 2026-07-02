import { getCourseCollection } from "../Config/ChromaDB.js"
import { generateEmbedding } from "./embedding.service.js";

export const vectorSearch = async (query , topK=5) => {
    const collection = await getCourseCollection();
    const queryVector = await generateEmbedding(query);

    const results = await collection.query({
        queryEmbedding :[queryVector],
        nResults:topK
    })
    const ids = results.ids?.[0]||[];
    const distances = results.distance?.[0]||[];
    const metadatas = results.metadatas?.[0]||[];

    return ids.map((id,index) => ({
        id,
        score:1-distances[index],
        metadata: metadatas[index],
        source:"vector",
    }))
}