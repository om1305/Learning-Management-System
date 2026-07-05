import { course } from "../Models/Course.js"
import { order } from "../Models/order.js"
import { user } from "../Models/user.js"

export const getAnalyitcsData= async()=>{
    const totalUser = await user.countDocuments()
    const totalCourse = await course.countDocuments()

    const salesData = await order.aggregate([
        {
            $group:{
                _id:null,
                totalEntrollments:{$sum:1},
                totalRevenue:{$sum:'$totalamount'}
            }
        }
    ])

    const {
        totalEntrollments=0,
        totalRevenue=0
    } = salesData[0]|| {}


    return {
        users:totalUser,
        courses:totalCourse,
        totalEntrollments,
        totalRevenue
    }
}

export const getAnalyticsDataController=async(req,res)=>{
    try {
        const data = await getAnalyitcsData()
        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}



export const dailyEnrollmentData= async(startDate, endDate)=>{
    try {

        const dailyData = await order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },


            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d", date:"$createdAt"}
                    },
                    enrollments:{$sum:1},
                    revenue:{$sum:"$totalamount"}
                },
            },
            {$sort:{_id:1}}
        ])


        const dateArray = getDatesInRange(startDate,endDate)

        return dateArray.map((date)=>{
            const found = dailyData.find((item)=>item._id===date)
            return{
                date,
                enrollments:found?.enrollments||0,
                revenue:found?.revenue||0
            }
        })

        
        
    } catch (error) {
        console.log(error)
    }

}


function getDatesInRange(startDate, endDate){
    const dates=[]
    let currentDate = new Date(startDate)

    while(currentDate<= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1)
    }

    return dates
}


export const getDailyAnalytcController=async(req,res)=>{
    try {
        const{startDate, endDate}= req.query

        if(!startDate || !endDate){
            return res.status(401).json({
                message:"Date not found"
            })
        }

        const start = new Date(startDate)
        const end = new Date(endDate)


        const data = await dailyEnrollmentData(start, end)

        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
}