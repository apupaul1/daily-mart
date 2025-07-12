import React from 'react';
import { NavLink } from 'react-router';
import {
  FaUsers, FaClipboardList, FaBullhorn, FaShoppingCart, FaPlus,
  FaChartLine, FaTools
} from 'react-icons/fa';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BsCardChecklist } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';

const navItems = [
  { label: 'All Users', path: '/all-users', icon: <FaUsers /> },
  { label: 'All Product', path: '/all-products', icon: <FaClipboardList /> },
  { label: 'All Advertisement', path: '/all-ads', icon: <FaBullhorn /> },
  { label: 'All Order', path: '/all-orders', icon: <FaShoppingCart /> },
  { label: 'Add Product', path: '/dashboard/addproduct', icon: <FaPlus /> },
  { label: 'My Products', path: '/my-products', icon: <MdOutlineProductionQuantityLimits /> },
  { label: 'Add Advertisement', path: '/add-advertisement', icon: <FaBullhorn /> },
  { label: 'My Advertisements', path: '/my-advertisements', icon: <FaChartLine /> },
  { label: 'View Price Trends', path: '/price-trends', icon: <BsCardChecklist /> },
  { label: 'Manage Watchlist', path: '/manage-watchlist', icon: <FaTools /> },
  { label: 'My Order List', path: '/dashboard/myorder', icon: <FaShoppingCart /> },
];

const Sidebar = () => {

  const { user } = useAuth()

  return (
    <div className="p-4 flex flex-col min-h-screen h-full overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <img
          src="https://themesbrand.com/ubold/layouts/assets/images/logo-sm.png"
          alt="Logo"
          className="w-6 h-6 mr-2"
        />
        <h1 className="text-lg font-bold text-gray-900">DailyMart</h1>
      </div>

      {/* Profile */}
      <div className="text-center mb-6">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar6.png"
          alt="Avatar"
          className="w-16 h-16 rounded-full mx-auto mb-2"
        />
        <h2 className="text-sm font-semibold text-gray-800">{user.email}</h2>
        <p className="text-xs text-gray-500">Admin Head</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <p className="text-xs text-gray-400 uppercase mb-2">Navigation</p>
        <ul className="space-y-2 text-sm">
          {navItems.map(({ label, path, icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 hover:bg-purple-100 hover:text-purple-700 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'
                  }`
                }
              >
                <span className="text-base">{icon}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
