import React from 'react';
import { Outlet, NavLink } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';

const AuthLayout = () => {
    return (
        <div className="min-h-screen relative bg-cover bg-center" style={{
            backgroundImage: "url(https://i.ibb.co/Df7SCRDg/Auth-Layout.jpg)",
        }}>

            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

            <div className="sticky top-0 z-20">
                <div className="navbar bg-green-400 shadow-sm">
                    <div className="navbar-start">
                        <p className="btn btn-ghost text-xl ">DailyMart</p>
                    </div>
                    <div className="navbar-end flex gap-5">
                        <button className='btn'><NavLink to={'/login'}>Login</NavLink></button>
                        <button className='btn'><NavLink to={'/register'}>Signup</NavLink></button>
                    </div>
                </div>
            </div>


            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 z-10 relative">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
