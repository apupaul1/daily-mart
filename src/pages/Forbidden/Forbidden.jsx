import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="text-red-600 text-6xl mb-4">
        <FaLock />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
