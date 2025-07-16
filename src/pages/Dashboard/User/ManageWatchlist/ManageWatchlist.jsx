import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageWatchlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: watchlists = [], refetch, isLoading } = useQuery({
        queryKey: ['my-watchlist', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/watchlist?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/watchlist/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch();
                    })
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', error.message || 'Failed to delete the product.', 'error');
            }
        }
    };

    if (isLoading) {
        return <p className="text-center mt-10 text-lg text-gray-500">Loading watchlist</p>;
    }

    return (
        <div className="px-4 py-10">
            <h2 className="text-2xl font-bold text-center mb-6"> My Watchlist</h2>

            {watchlists.length === 0 ? (
                <div className='flex items-center flex-col gap-5'>
                    <p className="text-center text-gray-600">No items in your watchlist.</p>
                    <Link to={'/allproducts'}>
                        <button className='btn btn-neutral'>Go Back to Add Items</button></Link>
                </div>

            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border rounded-lg shadow">
                        <thead className="bg-gray-100 text-left text-gray-700">
                            <tr>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Market Name</th>
                                <th className="px-4 py-2">Date Added</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlists.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3">{item.productName}</td>
                                    <td className="px-4 py-3">{item.marketName}</td>
                                    <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => navigate('/allproducts')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Add More
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Remove
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

export default ManageWatchlist;
