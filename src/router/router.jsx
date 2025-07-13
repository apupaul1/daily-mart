import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage/HomePage/HomePage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Regsiter/Register";
import PrivateRoute from "../routes/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import MyOrderList from "../pages/Dashboard/MyOrderList/MyOrderList";
import AddProduct from "../pages/Vendor/AddProduct";
import MyAddedProduct from "../pages/Vendor/MyAddedProduct/MyAddedProduct";
import AdvertisementForm from "../pages/Dashboard/AdvertisementForm/AdvertisementForm";
import MyAdvertisements from "../pages/Vendor/MyAdvertisements/MyAdvertisements";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
        children: [
            {
                index: true,
                Component: Dashboard
            },
            {
                path: 'myorder',
                element: <MyOrderList></MyOrderList>
            },
            {
                path: 'addproduct',
                element:  <AddProduct></AddProduct> 
            },
            {
                path: 'my-products',
                element: <MyAddedProduct></MyAddedProduct> 
            },
            {
                path: 'postadvertisement',
                element: <AdvertisementForm></AdvertisementForm> 
            },
            {
                path: 'my-ads',
                element:  <MyAdvertisements></MyAdvertisements> 
            }
        ]
    },
])