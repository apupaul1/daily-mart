import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const AllProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, isLoading, refetch } = useQuery({
    queryKey: ['all-products', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/products?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const products = data.products || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const approveProduct = async (id) => {
    try {
      await axiosSecure.patch(`/products/${id}`, { status: 'approved' });
      queryClient.invalidateQueries(['all-products']);
      Swal.fire('Approved!', 'Product has been approved.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'Failed to approve product.', 'error');
    }
  };

  const rejectProduct = async (id) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Product',
      input: 'text',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter rejection reason',
      showCancelButton: true,
    });

    if (reason) {
      try {
        await axiosSecure.patch(`/products/${id}`, {
          status: 'rejected',
          rejectionReason: reason,
        });
        queryClient.invalidateQueries(['all-products']);
        Swal.fire('Rejected!', 'Product has been rejected.', 'error');
      } catch (error) {
        Swal.fire('Error!', 'Failed to reject product.', 'error');
      }
    }
  };


  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/products/${id}`);
      queryClient.invalidateQueries(['all-products']);
      Swal.fire('Deleted!', 'Product has been deleted.', 'success');
      refetch()
    }
  };

  const handleEdit = (product) => {
    navigate(`/dashboard/update-product/${product._id}`, { state: { product } });
  };

  return (
    <div className="py-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-lg shadow-md bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Market</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-6 py-3">{(page - 1) * limit + index + 1}</td>
                  <td className="px-6 py-3">{product.vendorName}</td>
                  <td className="px-6 py-3">{product.vendorEmail}</td>
                  <td className="px-6 py-3">{product.marketName}</td>
                  <td className="px-6 py-3">{product.pricePerUnit}</td>
                  <td className="px-6 py-3 capitalize">{product.status}</td>
                  <td className="px-6 py-3 flex flex-wrap gap-2">
                    {product.status === 'pending' && (
                      <>
                        <button
                          onClick={() => approveProduct(product._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => rejectProduct(product._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          title="Reject"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                      title="Update"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded ${page === 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
              }`}
          >
            Previous
          </button>

          <span className="text-indigo-700 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded ${page === totalPages
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
