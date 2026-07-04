import express from 'express'
import { adminprotectroute, protectedRoutes } from '../Middlewares/auth.middleware.js'
import { getAnalyticsDataController, getDailyAnalytcController } from '../Controller/analytic.controller.js'


const analyticRoute = express.Router()

analyticRoute.get('/getAnalytic',protectedRoutes , adminprotectroute ,getAnalyticsDataController);
analyticRoute.get('/getAnalytic',protectedRoutes , adminprotectroute ,getDailyAnalytcController);

export default analyticRoute