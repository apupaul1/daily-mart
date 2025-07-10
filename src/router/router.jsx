import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage/HomePage/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Regsiter/Register";

export const router = createBrowserRouter([
    {
        path:'/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            }
        ]
    },
    {
        path: '',
        Component: AuthLayout,
        children : [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
])