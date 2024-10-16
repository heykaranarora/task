import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const UserDetails = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/admin/userdetails', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchUserDetails();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/admin/deleteuser/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                setUser((prevUsers) => prevUsers.filter((user) => user._id !== userId));
                alert("User deleted successfully.");
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleBlock = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/admin/blockuser/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to block user');
            }

            const data = await response.json();
            alert(data.message); 

            setUser((prevUsers) => prevUsers.map(user => user._id === userId ? { ...user, isBlocked: true } : user));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleUnblock = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/admin/unblockuser/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to unblock user');
            }

            const data = await response.json();
            alert(data.message); 
            setUser((prevUsers) => prevUsers.map(user => user._id === userId ? { ...user, isBlocked: false } : user));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>; 
    }

    return (
        <div>
        <Navbar/>
            <h2 className="text-xl font-bold mb-4 mt-10">User Details</h2>
            {user.length > 0 ? (
                <table className="w-full border-collapse border border-gray-800">
                    <thead>
                        <tr>
                            <th className="border border-gray-800">Name</th>
                            <th className="border border-gray-800">Phone Number</th>
                            <th className="border border-gray-800">Email</th>
                            <th className="border border-gray-800">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-gray-800">{user.name}</td>
                                <td className="border border-gray-800">{user.phoneNumber}</td>
                                <td className="border border-gray-800">{user.email}</td>
                                <td className="border border-gray-800">
                                    <div className="flex justify-center gap-5">
                                        {user.isBlocked ? (
                                            <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleUnblock(user._id)}>Unblock</button>
                                        ) : (
                                            <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleBlock(user._id)}>Block</button>
                                        )}
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No user found</div>
            )}
        </div>
    );
};

export default UserDetails;
