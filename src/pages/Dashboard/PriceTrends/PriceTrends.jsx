import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

const PriceTrends = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedItem, setSelectedItem] = useState(null);

    const { data: watchlist = [], isLoading } = useQuery({
        queryKey: ['watchlist', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
            return res.data;
        }
    });

    // Get chart data from selected item
    const selectedData = selectedItem?.previousPrice?.map(p => ({
        date: new Date(p.date).toLocaleDateString('en-GB'),
        price: Number(p.price),
    })) || [];

    // Calculate price trend (percentage change)
    const priceTrend = (() => {
        if (selectedData.length < 2) return 0;
        const start = selectedData[0].price;
        const end = selectedData[selectedData.length - 1].price;
        return (((end - start) / start) * 100).toFixed(1);
    })();

    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-indigo-600 my-6">Price Trends</h2>
            <div className="flex flex-col md:flex-row p-6 gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/4 border-r p-4 bg-white shadow rounded-md">
                    <h3 className="font-bold mb-3">Tracked Items</h3>
                    <ul>
                        {watchlist.map(item => (
                            <li key={item._id}>
                                <button
                                    className={`w-full text-left py-2 px-3 rounded-md hover:bg-gray-100 ${selectedItem?._id === item._id ? 'bg-gray-200 font-semibold' : ''
                                        }`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    🛒 {item.productName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chart Area */}
                <div className="w-full md:flex-1 p-4 bg-white shadow rounded-md">
                    {selectedItem ? (
                        <>
                            <h2 className="text-xl font-bold mb-1">{selectedItem.productName}</h2>
                            <p className="text-gray-600 mb-4">Market: {selectedItem.marketName}</p>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={selectedData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>

                            <p className={`mt-4 font-semibold ${priceTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                Trend: {priceTrend >= 0 ? '+' : ''}{priceTrend}% last {selectedData.length} days
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-500">Select a product to view price trends</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PriceTrends;
