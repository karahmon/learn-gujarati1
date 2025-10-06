import {createBrowserRouter} from "react-router-dom"
import LoginPage from "@/pages/Login.tsx"
import HomePage from "@/pages/HomePage.tsx"
import MentorsPage from "@/pages/MentorsPage.tsx"
import ComingSoon from "@/pages/ComingSoon.tsx"
import DashboardLayout from "./layout/Dashboard.layout"


export const Router = createBrowserRouter([
    {
        path:'/',
        element:<LoginPage />
    },
    {
        path:'dashboard',
        element:<DashboardLayout />,
        children:[
            {
                path:'home',
                element:<HomePage />
            },
            {
                path:'mentors',
                element:<MentorsPage />
            },
            {
                path:'students',
                element:<ComingSoon pageName="Students" />
            },
            {
                path:'alumni',
                element:<ComingSoon pageName="Alumni" />
            },
            {
                path:'tutors',
                element:<ComingSoon pageName="Tutors" />
            },
            {
                path:'batches',
                element:<ComingSoon pageName="Batches" />
            }
        ],
    }
]);