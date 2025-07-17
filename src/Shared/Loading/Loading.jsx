import React from 'react';

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-lg font-medium text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;