import React from 'react';
import { FaPaperPlane, FaStar } from 'react-icons/fa'; // Make sure you have react-icons installed

const NewsLetter = () => {
    return (
        <div className="relative overflow-hidden mb-12 px-6">
            <div className="absolute inset-0 z-0">
                {/* Subtle background gradient */}
                
                {/* A more stable way to add a pattern, using a div with a repeating background */}
                <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d3748' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zm30 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zm0 30v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <div className="bg-gray-800 shadow-xl rounded-3xl p-8 md:p-12 border border-gray-700 transition-all duration-500 hover:shadow-2xl hover:border-green-500 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center text-green-400 mb-4">
                        <FaStar className="text-xl md:text-2xl mr-2 animate-pulse" />
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                            Get <span className="text-green-400">20% off</span> Discount Coupon
                        </h2>
                    </div>
                    <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
                        Your one-stop source for daily market insights, exclusive deals, and fresh updates. Join our community of savvy shoppers!
                    </p>

                    <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your best email address"
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