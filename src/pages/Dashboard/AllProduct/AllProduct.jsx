import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch all products
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/products');
            return res.data;
        },
    });

    console.log(products);

    // Handle product approval
    const handleApprove = async (id) => {
        try {
            const res = await axiosSecure.patch(`/products/${id}`, { status: 'approved' });
            if (res.data.updated) {
                queryClient.invalidateQueries('all-products');
            }
        } catch (error) {
            console.error('Error approving product:', error);
        }
    };

    // Handle product rejection
    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/products/${id}`, { status: 'rejected' });
            if (res.data.updated) {
                queryClient.invalidateQueries('all-products');
            }
        } catch (error) {
            console.error('Error rejecting product:', error);
        }
    };

    // Handle product removal with confirmation
    const handleRemove = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                axiosSecure.delete(`/products/${id}`)
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

    // Loading state
    if (isLoading) {
        return <p className="text-center mt-10 text-lg text-gray-500">Loading products...</p>;
    }

    return (
        <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">All Products</h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-600">No products found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full rounded-lg shadow-lg bg-white">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Market Name</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} className="border-b border-b-gray-300 hover:bg-gray-50 transition-all duration-200">
                                    <td className="px-6 py-3 text-gray-800">{product.itemName}</td>
                                    <td className="px-6 py-3 text-gray-600">{product.marketName}</td>
                                    <td className="px-6 py-3 text-green-600">{product.pricePerUnit}</td>
                                    <td className="px-6 py-3 text-yellow-500">{product.status}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {product.status === 'pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(product._id)}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm shadow"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(product._id)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm shadow"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => navigate(`/update-product/${product._id}`)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm shadow"
                                                >
                                                    Update
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemove(product._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
                                            >
                                                Remove
                                            </button>
                                        </div>
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

export default AllProducts;
