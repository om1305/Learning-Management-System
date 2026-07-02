export const cosineSimilarity = (VecA , VecB)=>{

    if (VecA.length !== VecB.length) {
    throw new Error("Vectors must have the same length");
    }
    //Array.isArray() is a built in JS method used to check where a value is array or not
    if(!Array.isArray(VecA) || !Array.isArray(VecB)){
        throw new Error("cosineSimilairy : vector must be the same length");
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for(let i = 0; i < VecA.length ; i++){
        dotProduct += VecA[i] * VecB[i];
        magnitudeA += VecA[i] * VecB[i];
        magnitudeB += VecA[i] * VecB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if(magnitudeA ===0 || magnitudeB === 0){
        return 0;
    }
    return dotProduct / (magnitudeA*magnitudeB);
}