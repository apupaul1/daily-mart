import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div className=" bg-gradient-to-r from-green-50 to-white py-12 lg:h-[540px] mb-12">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-4">
                {/* Text Section */}
                <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h4 className="text-green-700 font-medium text-lg">Fresh Products</h4>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mt-2">
                        Buy Your <span className="text-green-600">Daily Groceries</span><br />
                        Easily & Quickly
                    </h1>
                    <p className="text-gray-600 mt-4 text-sm sm:text-base">
                        Get real-time market prices and shop smart with trusted vendors near you.
                    </p>
                    <button className="mt-6 lg:px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition w-full sm:w-1/2 md:w-1/3">
                        Shop Now
                    </button>
                </motion.div>

                {/* Image Section */}
                <motion.div 
                    className="w-full md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <img 
                        src="https://i.ibb.co/wZW5PJys/Banner1.webp"
                        alt="Fresh Basket"
                        className="max-h-[360px] w-auto object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
