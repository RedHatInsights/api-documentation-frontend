import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "../pages/LandingPage";
import {APIPage} from "../pages/APIPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/api/:api',
        element: <APIPage />
    }
]);
