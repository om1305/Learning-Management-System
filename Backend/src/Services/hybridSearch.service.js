import { reciprocalRankFusion } from "../utils/reciprocalRankFusion.js";
import { keywordSearch } from "./keywordSearch.js";
import { rerank } from "./reranker.services.js";
import { vectorSearch } from "./VectorSearch.service.js";

const HYBRID_CANDIDATE_POOL = 5;
const FINAL_RESULT_COUNT = 3;

export const HybridSearch = async(query) => {
    if(!query || !query.trim()){
        throw new Error("Search query must not be empty");
    }

    const [vectorResults , keywordResults] = await Promise.all([
        vectorSearch(query , 5),
        keywordSearch(query , 5),
    ]);

    const fused = reciprocalRankFusion([vectorResults , keywordResults]);

    if(fused.length === 0){
        return[];
    }

    const topHybridCandidates = fused.slice(0,HYBRID_CANDIDATE_POOL);
    const rerankedResults = await rerank(query , topHybridCandidates);

    return rerankedResults.slice(0,FINAL_RESULT_COUNT).map((result) => ({
        courseId:result.metadata.courseId,
        title:result.metadata.title,
        description:result.metadata.description,
        thumbnail:result.metadata.thumbnail
    }))
}