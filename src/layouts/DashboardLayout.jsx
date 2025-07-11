import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Sidebar from '../Shared/DashboardComponent/Sidebar';

const DashboardLayout = () => {
    return (
        <div className='flex pt-4 gap-2 bg-gray-100'>
            <div className='flex-1 pl-3'>
                <Sidebar></Sidebar>
            </div>
            <div className='flex-4'>
                <div className='max-w-6xl mx-auto'>
                    <Navbar></Navbar>
                </div>
                <div className='max-w-6xl mx-auto'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;