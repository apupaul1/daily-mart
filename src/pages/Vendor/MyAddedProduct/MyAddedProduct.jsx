import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyAddedProduct = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const { data: products = [], refetch } = useQuery({
        queryKey: ['my-products', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user.email}`);
            return res.data;
        },
    });

    console.log(products);

    const handleUpdate = (id) => {
        navigate(`/dashboard/update-product/${id}`);
    }

    console.log(handleUpdate);

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

    // if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="">
            <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-center ">
                My Added Products
            </h2>

            <div className="overflow-x-auto rounded-lg border shadow-sm">
                <table className="table w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Price per Unit</th>
                            <th>Market Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td className="min-w-[120px]">{product.itemName}</td>
                                <td className="whitespace-nowrap">{product.pricePerUnit}</td>
                                <td className="min-w-[140px]">{product.marketName}</td>
                                <td>{new Date(product.date).toLocaleDateString()}</td>
                                <td>
                                    <div
                                        className={`badge mb-1 cursor-default tooltip ${product.status === 'approved'
                                                ? 'badge-success'
                                                : product.status === 'rejected'
                                                    ? 'badge-error'
                                                    : 'badge-warning'
                                            }`}
                                        data-tip={
                                            product.status === 'rejected' && product.rejectionReason
                                                ? product.rejectionReason
                                                : ''
                                        }
                                    >
                                        {product.status}
                                    </div>
                                </td>


                                <td className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                                    <button
                                        className="btn btn-sm btn-info w-24"
                                        onClick={() => handleUpdate(product._id)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error w-24"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAddedProduct;
