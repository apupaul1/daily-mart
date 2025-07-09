import React from 'react';
import { motion } from 'framer-motion';
import {
    FaStore,
    FaChartLine,
    FaCreditCard,
    FaUserShield,
    FaTags,
    FaClipboardList,
} from 'react-icons/fa';

const services = [
    {
        icon: <FaStore className="text-green-600 text-4xl" />,
        title: 'Live Market Data',
        description:
            'Access daily updates from vendors across multiple local markets in real-time.',
    },
    {
        icon: <FaChartLine className="text-green-600 text-4xl" />,
        title: 'Price Trend Analytics',
        description:
            'Visualize product price changes using interactive graphs for smarter buying.',
    },
    {
        icon: <FaCreditCard className="text-green-600 text-4xl" />,
        title: 'Secure Checkout',
        description:
            'Enjoy a smooth, encrypted buying experience powered by Stripe.',
    },
    {
        icon: <FaUserShield className="text-green-600 text-4xl" />,
        title: 'Role-Based Access',
        description:
            'Vendor, admin, or user—each role gets personalized access and controls.',
    },
    {
        icon: <FaTags className="text-green-600 text-4xl" />,
        title: 'Offers & Promotions',
        description:
            'Browse latest discounts and promotional deals posted by admins and vendors.',
    },
    {
        icon: <FaClipboardList className="text-green-600 text-4xl" />,
        title: 'Watchlist & Orders',
        description:
            'Track your favorite products and review past orders from your dashboard.',
    },
];

const OurServices = () => {
    return (
        <section className="bg-gradient-to-t from-slate-800 to-slate-800 py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto my-12 rounded-4xl border">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-4">
                 Our Core Services
            </h2>
            <p className="text-center text-[#DADADA] max-w-3xl mx-auto mb-12 text-sm sm:text-base">
                We offer a seamless experience for tracking, analyzing, and purchasing local market products. Our services ensure transparency, convenience, and smart decision-making for every shopper and vendor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-12 hover:shadow-lg transition-all duration-300 border hover:bg-gradient-to-t from-green-200 to-green-300 border-gray-100 text-center"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <div className="flex items-center justify-center mb-4">{service.icon}</div>
                        <h3 className="text-xl font-bold text-[#03373D]">{service.title}</h3>
                        <p className="text-[#606060] mt-3 text-sm sm:text-base">{service.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OurServices;
