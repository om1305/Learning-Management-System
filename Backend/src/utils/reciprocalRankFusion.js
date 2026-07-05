// const K = 60;

// export const reciprocalRankFusion = (lists) => {

//     const scores = {};

//     // Go through every search result list
//     lists.forEach((list) => {

//         // Go through every course in that list
//         list.forEach((course, index) => {

//             const rank = index + 1;

//             const score = 1 / (K + rank);

//             // If course is seen for the first time
//             if (!scores[course.id]) {

//                 scores[course.id] = {
//                     course,
//                     score: 0
//                 };

//             }

//             // Add score
//             scores[course.id].score += score;

//         });

//     });

//     // Convert object into array
//     const result = Object.values(scores);

//     // Sort by score
//     result.sort((a, b) => b.score - a.score);

//     return result;

// };

const K = 60;

export const reciprocalRankFusion = (lists) => {
    const scoreMap = new Map();

    lists.forEach((list) => {
        list.forEach((item, index) => {
            const rank = index + 1;
            const contribution = 1 / (K + rank);

            if (!scoreMap.has(item.id)) {
                scoreMap.set(item.id, {
                    id: item.id,
                    metadata: item.metadata,
                    rrfScore: 0,
                });
            }

            const entry = scoreMap.get(item.id);

            entry.rrfScore += contribution;

            // Preserve metadata if one source didn't have it
            if (!entry.metadata && item.metadata) {
                entry.metadata = item.metadata;
            }
        });
    });

    return Array.from(scoreMap.values()).sort(
        (a, b) => b.rrfScore - a.rrfScore
    );
};

//PRODUCTION LEVEL CODE 

// const K = 60;

// export const reciprocalRankFusion = (rankedLists , K) =>{
//     const scoreMap = new Map();

//     rankedLists.forEach((list , listIndex) => {
//         const rank = index + 1;
//         const contribution = 1 /(k+rank);

//         if(!scoreMap.has(item.id)){
//             scoreMap.set(item.id,{
//                 id:item.id,
//                 rrfScore:0,
//                 doc:item,
//                 sources:{},
//             });
//         }
//         const entry = scoreMap.get(item.id);
//         entry.rrfScore += contribution;
//         entry.sources[`list_${listIndex}`]={rank,contribution};

//         entry.doc = {...item , ...entry.doc};
//     });

//     return Array.from(scoreMap.values()).sort((a,b)=> b.rrfScore-a.rrfScore);
// };
