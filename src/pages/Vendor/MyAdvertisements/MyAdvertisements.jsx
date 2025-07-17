import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Shared/Loading/Loading';
// import AdvertisementFormModal from './AdvertisementFormModal'; // You must create this

const MyAdvertisements = () => {
    const [selectedAd, setSelectedAd] = useState(null);
    const queryClient = useQueryClient();

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            status: "pending"
        }
    });

    const [bannerImage, setBannerImage] = useState('')


    const handleBannerupload = async (e) => {
        const banner = e.target.files[0];
        console.log(banner);
        const formData = new FormData();
        formData.append('image', banner);

        const bannerUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`
        const res = await axios.post(bannerUploadURL, formData);

        console.log(res.data);
        setBannerImage(res.data.data.url);
    }

    console.log(user.email);

    // Fetch current vendor ads
    const { data: ads = [], refetch, isLoading } = useQuery({
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

    useEffect(() => {
        if (selectedAd) {
            reset({
                title: selectedAd.title,
                description: selectedAd.description,
                status: selectedAd.status || 'pending',
            });
            setBannerImage(selectedAd.banner); // Preload existing image (optional)
        }
    }, [selectedAd, reset]);

    const onSubmit = async (data) => {
        try {
            if (!bannerImage) {
                toast.error("Please wait for the image to finish uploading.");
                return;
            }

            const adData = {
                ...data,
                banner: bannerImage,
                name: user.displayName,
                email: user.email,
            };

            if (selectedAd) {
                // Update ad
                const res = await axiosSecure.patch(`/ads/${selectedAd._id}`, adData);

                if (res.data.message === 'Ad updated successfully') {
                    toast.success("Advertisement updated successfully!");
                    setSelectedAd(null);
                    reset();
                    setBannerImage('');
                    refetch();
                    document.getElementById('my_modal_5').close(); // Close modal

                } else {
                    toast.error("Update failed.");
                }
            } else {
                // Create new ad
                const res = await axiosSecure.post("/ads", adData);

                if (res.data.insertedId) {
                    toast.success("Advertisement submitted successfully!");
                    reset();
                    setBannerImage('');
                    refetch();
                } else {
                    toast.error("Submission failed.");
                }
            }

        } catch (err) {
            console.error("Submit error:", err);
            toast.error("Something went wrong.");
        }
    };


    { isLoading && <Loading></Loading> }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-neutral mb-6">My Advertisements</h2>
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
                                        onClick={() => {
                                            setSelectedAd(ad);
                                            document.getElementById('my_modal_5').showModal();
                                        }}
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
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
                    <div className=" p-9 bg-white shadow rounded-lg relative">
                        <h2 className="text-3xl font-bold mb-12 text-center">Update Advertisement</h2>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            method="dialog"
                            className="space-y-4 ">

                            {/* Ad Title */}
                            <div>
                                <label className="label">Ad Title</label>
                                <input
                                    // defaultValue={ad.title}
                                    {...register("title", { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter ad title"
                                />
                                {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="label">Short Description</label>
                                <textarea
                                    // defaultValue={ad.description}
                                    {...register("description", { required: true })}
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Enter description"
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
                            </div>

                            {/* Status (readonly field) */}
                            <div>
                                <label className="label">Status</label>
                                <input
                                    {...register("status")}
                                    className="input input-bordered w-full bg-gray-100 text-gray-600 cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="form-control">
                                <label className="label text-black">Promotional Banner</label>
                                <input
                                    onChange={handleBannerupload}
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered w-full"
                                    placeholder='Your Advertisement banner' />
                            </div>

                            {/* Submit */}
                            <button className="btn btn-primary w-full" type="submit">Update Ad</button>

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-8">✕</button>
                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyAdvertisements;
