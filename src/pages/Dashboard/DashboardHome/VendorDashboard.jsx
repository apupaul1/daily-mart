// src/components/VendorDashboard.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Shared/Loading/Loading';

const VendorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['vendorDashboard', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/vendor/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>
  if (error) return <p className="text-center mt-10 text-red-600">Error loading data</p>;

  const { totalProducts, outOfStock, recentProducts } = data;

  const salesTrendData = recentProducts.map(p => ({
    name: p.productName,
    sales: p.stock === 0 ? 0 : 1,
  }));

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Welcome Vendor! {user.displayName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-purple-100 rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-purple-900">{totalProducts}</p>
        </div>
        <div className="bg-red-100 rounded-lg shadow p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Out of Stock</h3>
          <p className="text-3xl font-bold text-red-900">{outOfStock}</p>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Recent Products</h2>
        <ul className="space-y-2">
          {recentProducts.map((p, idx) => (
            <li
              key={idx}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow flex justify-between items-center"
            >
              <span className="font-medium text-gray-700">{p.productName}</span>
              <span className="text-sm text-gray-600">৳{p.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesTrendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#9333ea" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default VendorDashboard;
