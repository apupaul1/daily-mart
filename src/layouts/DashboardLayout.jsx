import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { Link, NavLink, Outlet } from 'react-router';
import Sidebar from '../Shared/DashboardComponent/Sidebar';
import { FaBars } from 'react-icons/fa';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="drawer ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-base-300">
        {/* Navbar */}
        <div className="navbar bg-base-100 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal flex items-center">
              <li><Link to={'/'}>Home</Link></li>
              <NavLink><button className='btn btn-primary'>Logout</button></NavLink>
            </ul>
          </div>
        </div>
        <div className='flex gap-10 m-4'>
          <div className='hidden lg:block w-64 flex-1 bg-base-100'>
            <Sidebar></Sidebar>
          </div>
          <div className='flex-4'>
            <Outlet></Outlet>
          </div>

        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
       <div className='bg-white'>
         <Sidebar></Sidebar>
       </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
