// src/components/AdminDashboard.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import Loading from '../../../Shared/Loading/Loading';

const COLORS = ['#6b46c1', '#38a169', '#dd6b20', '#3182ce', '#d53f8c'];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/admin/stats');
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>
  if (error) return <p className="text-center mt-10 text-red-600">Error loading data</p>;
  if (!data) return <p className="text-center mt-10 text-gray-500">No data available</p>;

  const { userRoles, pendingAdsCount, totalProducts, totalReports } = data;
  const totalUsers = userRoles.reduce((acc, curr) => acc + curr.count, 0);

  const stats = [
    { label: 'Pending Ads', value: pendingAdsCount, color: '#f97316' },
    { label: 'Total Products', value: totalProducts, color: '#3b82f6' },
    { label: 'Total Reports', value: totalReports, color: '#ef4444' },
    { label: 'Total Users', value: totalUsers, color: '#8b5cf6' },
  ];

  return (
    <div className="p-8 md:p-12 bg-white rounded-2xl shadow-xl">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-purple-700 tracking-wider uppercase">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-5 text-white shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            style={{ backgroundColor: color }}
          >
            <h3 className="text-lg font-medium mb-1">{label}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Pie Chart Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Role Distribution</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={userRoles}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={50}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              paddingAngle={4}
            >
              {userRoles.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} Users`, 'Role']}
              contentStyle={{ backgroundColor: '#f1f5f9', borderRadius: 8 }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              wrapperStyle={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#4b5563',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default AdminDashboard;
