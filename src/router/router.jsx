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
import AllProducts from "../pages/AllProducts/AllProducts";
import ViewDetailsProduct from "../pages/ViewDetailsProduct/ViewDetailsProduct";
import ManageWatchlist from "../pages/Dashboard/User/ManageWatchlist/ManageWatchlist";
import Payment from "../pages/Dashboard/Payment/Payment";
import AllOrder from "../pages/Dashboard/AllOrder/AllOrder";
import AllProduct from "../pages/Dashboard/AllProduct/AllProduct";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllAds from "../pages/Dashboard/AllAds/AllAds";
import PriceTrends from "../pages/Dashboard/PriceTrends/PriceTrends";
import UpdateProduct from "../pages/Vendor/UpdateProduct/UpdateProduct";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: 'allproducts',
                Component: AllProducts
            },
            {
                path: 'details/:id',
                element: <PrivateRoute> <ViewDetailsProduct></ViewDetailsProduct> </PrivateRoute>
            }
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
                path: 'payment/:productId',
                Component: Payment
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
            },
            {
                path: 'watchlist',
                Component: ManageWatchlist
            },
            {
                path: 'price-trends',
                Component: PriceTrends,
            },
            {
                path: 'update-product/:id',
                Component: UpdateProduct
            },
            {
                path: 'all-orders',
                Component: AllOrder,
            },
            {
                path: 'all-products',
                Component: AllProduct
            },
            {
                path: 'all-users',
                Component: AllUsers,
            },
            {
                path: 'all-ads',
                Component: AllAds,
            }
        ]
    },
])