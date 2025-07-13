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

    const vendorEmail = "vendor@example.com"; // Replace with auth user email

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();

    // Fetch current vendor ads
    const { data: ads = [], isLoading, isError } = useQuery({
        queryKey: ['my-ads', user?.email],
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

    { isLoading && <p className="text-gray-500">Loading your advertisements...</p> }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">My Advertisements</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-left">
                    <thead className='bg-gray-100 text-gray-700 text-sm uppercase'>
                        <tr>
                            <th>Number</th>
                            <th>Ad Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map((ad, index) => (
                            <tr key={ad._id}>
                                <td>{index + 1}</td>
                                <td>{ad.title}</td>
                                <td>{ad.description}</td>
                                <td className="capitalize">{ad.status}</td>
                                <td className="flex gap-2 justify-center">
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
