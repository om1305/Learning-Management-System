import { course } from "../Models/Course.js"

export const keywordSearch = async(query , topK = 5) => {
    const textResults = await course.find(
        {$text : {$search : query}},
        {score : {$meta:textScore}})
        .sort({
            score:{
                $meta:"textScore",
            },
        })
        .limit(topK)
        //return plain javascript objects .lean()
        .lean();

        if(textResults.length >= topK){
            return mapToRankedList(textResults);
        }
        //Regex 
        // if there are less than topK results
        // "i" is for case sensitive
        const regex = new RegExp(
            query.split(" ").filter(Boolean.join("|")),
            "i"
        )

        const RegexResults = await course.find({
            $or:[
                {title:regex},
                {description:regex},
            ],
        })
        .limit(topK)
        .lean();

        // remove duplicates 
        const seen = new Set(
            textResults.map((doc) => doc._id.toString())
        );

        const merged = [
            ...textResults,
            ...RegexResults.filter(
                (doc)=> !seen.has(doc._id.toString())
            ),
        ].slice(0,topK);
        return mapToRankedList(merged);
};

export const mapToRankedList = (docs) => {
    return docs.map((doc , index)=>({
        id : doc._id.toString(),
        score : doc.score !== undefined ? doc.source : 1/(index+1),
        metadata : {
            courseId : doc._id.toString(),
            title:doc.title,
            description : doc.description,
            thumbnail : doc.thumbnail || "",
            amount: doc.amount,
        },
        source : "keyword",
    }))
}