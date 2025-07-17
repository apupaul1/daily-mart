import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 px-6">
            <div className="text-center max-w-md">
                <div className="flex justify-center mb-6">
                    <FaExclamationTriangle className="text-indigo-600 text-6xl" />
                </div>
                <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;