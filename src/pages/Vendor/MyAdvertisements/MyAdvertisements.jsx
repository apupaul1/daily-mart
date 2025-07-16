import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import AdvertisementFormModal from './AdvertisementFormModal'; // You must create this

const MyAdvertisements = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const queryClient = useQueryClient();

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    console.log(user.email);

    // Fetch current vendor ads
    const { data: ads = [], refetch } = useQuery({
        queryKey: ['my-ads', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/ads?email=${user.email}`);
            return res.data;
        }
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

    // { isLoading && <p className="text-gray-500">Loading your advertisements...</p> }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">My Advertisements</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full rounded-2xl shadow-lg bg-white">
                    <thead className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left'>
                        <tr className='text-center'>
                            <th className="px-6 py-3">Number</th>
                            <th className="px-6 py-3">Ad Title</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad, index) => (
                            <tr className='border-b text-center border-b-gray-300 hover:bg-gray-200 transition-all duration-200' key={ad._id}>
                                <td className='px-6 py-3 text-gray-800'>{index + 1}</td>
                                <td className='px-6 py-3 text-gray-800'>{ad.title}</td>
                                <td className='px-6 py-3 text-gray-800'>{ad.description}</td>
                                <td className="capitalize px-6 py-3 text-gray-800'">{ad.status}</td>
                                <td className="flex gap-2 justify-center px-6 py-3 text-gray-800">
                                    <button
                                        onClick={() => setSelectedAd(ad)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(ad._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Modal */}
            {selectedAd && (
                <AdvertisementFormModal
                    ad={selectedAd}
                    onUpdate={handleUpdate}
                    closeModal={() => setSelectedAd(null)}
                />
            )}
        </div>
    );
};

export default MyAdvertisements;
