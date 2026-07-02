import { ChromaClient } from "chromadb";

export const client = new ChromaClient({
    path:process.env.CHROMA_URL
})

let cachedCollection = null;

export const getCourseCollection = async() => {
    if(cachedCollection) return cachedCollection;

    const collectionName = process.env.CHROMA_COLLECTION_NAME;
    cachedCollection = await client.getOrCreateCollection({
        name:collectionName,
        metadata:{"hnsw:space" : "cosine"},
    });
    console.log(`chromaDB collection ready : ${collectionName}`);
    return cachedCollection;
}

export const pingChroma = async() =>{
    try {
        await client.heartbeat();
        console.log("chromaDB heartbeat OK")
    } catch (error) {
        console.log(`chroma heartbeat failed ${error.message}`)
    }
}