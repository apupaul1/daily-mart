import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';


const AllProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, isLoading } = useQuery({
    queryKey: ['all-products', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/products?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const products = data.products || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="py-6  min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">All Products</h2>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-lg shadow-md bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Market</th>
              <th className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className="border-b border-b-gray-300 hover:bg-gray-200 transition-all duration-200">
                  <td className="px-6 py-3 ">{(page - 1) * limit + index + 1}</td>
                  <td className="px-6 py-3 ">{product.vendorName}</td>
                  <td className="px-6 py-3 ">{product.vendorEmail}</td>
                  <td className="px-6 py-3 ">{product.marketName}</td>
                  <td className="px-6 py-3 ">{product.pricePerUnit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
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
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            className={`px-4 py-2 rounded transition ${
              page === 1
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
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            className={`px-4 py-2 rounded transition ${
              page === totalPages
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
