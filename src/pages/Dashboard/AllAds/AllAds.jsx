import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';

const AllAds = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all ads
    const { data: ads = [], isLoading, refetch } = useQuery({
        queryKey: ['all-ads'],
        queryFn: async () => {
            const res = await axiosSecure.get('/ads');
            return res.data;
        },
    });

    // Mutation: Update status
    const updateStatus = useMutation({
        mutationFn: async ({ id, status }) => {
            return await axiosSecure.patch(`/ads/status/${id}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-ads']);
            toast.success('Ad status updated!');
        },
        onError: () => toast.error('Failed to update ad status'),
    });

    const deleteAd = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This ad will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                axiosSecure.delete(`/ads/${id}`)
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
        return <Loading></Loading>;
    }

    return (
        <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-neutral mb-6">All Advertisements</h2>

            {ads.length === 0 ? (
                <p className="text-center text-gray-600">No advertisements found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full rounded-lg shadow-md bg-white">
                        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad) => (
                                <tr key={ad._id} className="border-b border-b-gray-300 hover:bg-gray-50 text-center">
                                    <td className="px-6 py-3">{ad.title || 'N/A'}</td>
                                    <td className="px-6 py-3">{ad.name || 'N/A'}</td>
                                    <td className="px-6 py-3">{ad.email}</td>
                                    <td className="px-6 py-3 capitalize font-medium text-blue-700">{ad.status || 'pending'}</td>
                                    <td className="px-6 py-3 flex gap-2 justify-center">
                                        {ad.status !== 'approved' && (
                                            <button
                                                onClick={() => updateStatus.mutate({ id: ad._id, status: 'approved' })}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {ad.status !== 'rejected' && (
                                            <button
                                                onClick={() => updateStatus.mutate({ id: ad._id, status: 'rejected' })}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Reject
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteAd(ad._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
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

export default AllAds;
