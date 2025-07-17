import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // Update role mutation
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

    // Role update handler
    const handleRoleChange = (id, newRole) => {
        mutation.mutate({ id, role: newRole });
    };

    if (isLoading) {
        return <p className="text-center mt-10 text-gray-500">Loading users...</p>;
    }

    return (
        <div className="px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">All Users</h2>

            {users.length === 0 ? (
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
