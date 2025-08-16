import React from 'react';
import { FaPaperPlane, FaStar } from 'react-icons/fa'; // Make sure you have react-icons installed

const NewsLetter = () => {
    return (
        <div className="relative overflow-hidden mb-12 px-6">
            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <div className="bg-gray-800 shadow-xl rounded-3xl p-8 md:p-12 border border-gray-700 transition-all duration-500 hover:shadow-2xl hover:border-green-500 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center text-green-400 mb-4">
                        <FaStar className="text-xl md:text-2xl mr-2 animate-pulse" />
                        <h2 className="text-xl md:text-5xl font-extrabold text-white leading-tight">
                            Get <span className="text-green-400">20% off</span> Discount Coupon
                        </h2>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm md:text-lg max-w-2xl mx-auto">
                        Your one-stop source for daily market insights, exclusive deals, and fresh updates. Join our community of savvy shoppers!
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full md:w-2/3 lg:w-1/2 px-6 py-4 rounded-xl border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-inner"
                        />
                        <button className="w-full md:w-auto px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                            <FaPaperPlane />
                            Subscribe Now
                        </button>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        By subscribing, you agree to our <a href="#" className="underline text-gray-400 hover:text-green-500 transition-colors">terms of service</a>. We never share your email with third parties.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;