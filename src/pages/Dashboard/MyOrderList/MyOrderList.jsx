import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import Loading from '../../../Shared/Loading/Loading';

const MyOrderList = () => {
    const { user,loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        },
    });


    if (loading) {
        return <Loading></Loading>
    }

    // Handle navigating to product details page
    const handleViewDetails = (productId) => {
        navigate(`/details/${productId}`);
    };

    // Render the payment data in a table format
    return (
        <div className=" py-5">
            <h2 className="text-3xl font-bold text-center text-neutral mb-6">My Order List</h2>

            {payments.length === 0 ? (
                <p className="text-center text-gray-600">No payments found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full rounded-2xl shadow-lg bg-white">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Market Name</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Quantity</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Transaction ID</th>
                                <th className="px-6 py-3">Paid At</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-b border-b-gray-300 hover:bg-gray-50 transition-all duration-200">
                                    <td className="px-6 py-3 text-gray-800">{payment.productName}</td>
                                    <td className="px-6 py-3 text-gray-600">{payment.marketName}</td>
                                    <td className="px-6 py-3 text-green-600">{payment.price}</td>
                                    <td className="px-6 py-3 text-gray-800">{payment.quantity}</td>
                                    <td className="px-6 py-3 text-blue-600">{payment.amount}</td>
                                    <td className="px-6 py-3 text-gray-700">{payment.transactionId.slice(0,12)}...</td>
                                    <td className="px-6 py-3 text-gray-500">
                                        {new Date(payment.paid_at_string).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-3 flex justify-center gap-3">
                                        <button
                                            onClick={() => handleViewDetails(payment.productId)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm shadow-md transition duration-300"
                                        >
                                            🔍 View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyOrderList;
