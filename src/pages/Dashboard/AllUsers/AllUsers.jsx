import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import Loading from '../../../Shared/Loading/Loading';


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    // Fetch users with search param
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: async ({ id, role }) => {
            return await axiosSecure.patch(`/users/${id}`, { role });
        },
        onSuccess: () => {
            toast.success("User role updated!");
            queryClient.invalidateQueries(['all-users']);
        },
        onError: () => {
            toast.error("Failed to update role.");
        },
    });

    const handleRoleChange = (id, newRole) => {
        mutation.mutate({ id, role: newRole });
    };

    return (
        <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-neutral mb-6">All Users</h2>

            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-md">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <FiSearch className="text-lg" />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
            </div>


            {isLoading ? (
                <Loading></Loading>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-600">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full rounded-lg shadow-md bg-white">
                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="border-b text-center border-b-gray-300 hover:bg-gray-50">
                                    <td className="px-6 py-3 text-gray-800">{user.name || 'N/A'}</td>
                                    <td className="px-6 py-3 text-gray-700">{user.email}</td>
                                    <td className="px-6 py-3 capitalize font-medium text-blue-700">{user.role || 'user'}</td>
                                    <td className="px-6 py-3 flex gap-2 justify-center">
                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'admin')}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {user.role !== 'vendor' && (
                                            <button
                                                onClick={() => handleRoleChange(user._id, 'vendor')}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                            >
                                                Make Vendor
                                            </button>
                                        )}
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

export default AllUsers;
