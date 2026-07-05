import Login from '@/Pages/Auth/Login'
import Register from "@/Pages/Auth/Register";
import Home from '@/Pages/users/Home';
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes';
import SingleCourse from '@/Pages/users/SingleCourse';
import YourCourse from '@/Pages/users/YourCourse';
import Dashboard from '@/Pages/admin/Dashboard';
import CreateModule from '@/Pages/admin/CreateModule';
import DashboardProducts from '@/Pages/admin/DashboardProduct';
import DashboardAnalytics from '@/Pages/admin/DashboardAnalytics';
import PaymenSuccess from '@/Pages/admin/Payment_Success';
import SinglePurchasedCourse from '@/Pages/users/SinglePurchaseCourse';
import Cancel from '@/Pages/admin/cancel';
import { AdminRoute } from './AdminRoutes';
import Profile from '@/Pages/users/ProfilePage';
// import { Profile } from '@/Pages/users/ProfilePage';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

        <Route path='/YourCourse' element={
        <ProtectedRoutes>
            <YourCourse/>
        </ProtectedRoutes>
    }/>

    <Route path='/cancel' element={
        <ProtectedRoutes>
            <Cancel/>
        </ProtectedRoutes>
    }/>

     <Route path='/YourCourse/:id' element={
        <ProtectedRoutes>
            <SinglePurchasedCourse/>
        </ProtectedRoutes>
    }/>

<Route path='/purchase' element={
<ProtectedRoutes>
    <PaymenSuccess/>
</ProtectedRoutes>
}/>

<Route path='/profile' element={
    <ProtectedRoutes>
        <Profile/>
    </ProtectedRoutes>
}/>

    <Route path='/dashboard' element={
        <ProtectedRoutes>
            <AdminRoute>

            <Dashboard/>
            </AdminRoute>
        </ProtectedRoutes>
        } >


        <Route index  element={
            <ProtectedRoutes>
            
            <DashboardAnalytics/>
        </ProtectedRoutes>
        }/>

    
    <Route path='dashboardProduct' element={
        <ProtectedRoutes>
            <DashboardProducts/>
        </ProtectedRoutes>
        }/>

        <Route path='CourseModule/:id' element={
            <ProtectedRoutes>
                <CreateModule/>
            </ProtectedRoutes>
        }/>
        </Route>

        <Route path='/singleCourse/:id' element={
        <ProtectedRoutes>
            <SingleCourse/>
        </ProtectedRoutes>
    }/>

        <Route path='/' element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }/>
        
    </Routes>
  )
}

export default MainRoutes