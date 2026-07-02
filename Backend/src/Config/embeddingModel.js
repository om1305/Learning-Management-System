import axios from "axios";
const PROVIDER = process.env.EMBEDDING_PROVIDER || "huggingface";

export const CallHuggingFaceEmbedding = async(search) =>{
    const url = `${process.env.HF_EMBEDDING_URL}/${process.env.HF_EMBEDDING_MODEL}`;

    const response = await axios.post(
        url,
        {
            inputs:search , options:{wait_for_model:true}
        },
        {
            headers:{
                Authorization : `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                "Content-Type" : "application/json",
            },
            timeout : 30000,
        }
    );

    let data = response.data;

    if(Array.isArray(data) && Array.isArray(data[0])){
        const tokenCount = data.length;
        const dims = data[0].length;
        const pooled = new Array(dims).fill(0);

        for(const tokenvector of data){
            for(let i = 0 ; i < dims; i++){
                pooled[i] += tokenvector[i];
            }
        }
        return pooled.map((val)=> val/tokenCount);
    }
    return data;
}