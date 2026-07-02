const axios = require("axios");
//converts raw number between 0 and 1
const sigmoid = (x) => 1 / (1 + Math.exp(-x));
// candidates - Array of courses selected by hybrid search
export const rerank = async(query , candidates) => {
    if(!candidates.length) return [];

    const url = `${process.env.HF_CROSS_ENCODER_URL}/${process.env.HF_CROSS_ENCODER_MODEL}`;

    const pairs = candidates.map((candidate) => [
        query ,
        `${candidate.doc.title}.${candidate.doc.description}`,
    ]);
    try {
        const response = await axios.post(
            url,
            {
                inputs:pairs.map(([source , target]) => ({ text:source , text_pair:target})),
                options:{wait_for_model:true},
            },
            {
                headers:{
                    Authorization:`Bearer${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type":"application/json",
                },
                timeout:30000,
            }
        )
        const rawScores = response.data.map((item) =>
        Array.isArray(item) ? item[0].score :item.score);

        return candidates.map((canditate , index) => ({
            id:candidate.id,
            score: Number(rawScores[index].toFixed(4)),
            metadata : candidate.doc,
        }))
        .sort((a,b) => b.score - a.score);
    }catch(error){
        console.warn(`cross-encoder rerank failed , falling back to RRF order : ${error.message}`);

        return candidates.map((candidate)=>({
            id:candidate.id,
            score:Number(sigmoid(candidate.rrfScore*10).toFixed(4)),
            metadata:candidate.doc,
        }))
        .sort((a,b)=>b.score - a.score);
    }
}