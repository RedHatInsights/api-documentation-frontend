import {createBrowserRouter, Navigate} from "react-router-dom";
import {LandingPage} from "../pages/LandingPage";
import {APIPage} from "../pages/APIPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/api',
        element: <Navigate to="/" replace />,
    },
    {
        path: '/api/:api',
        element: <APIPage />
    }
], {
    basename: process.env.PUBLIC_URL
});
