'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axiosInstance from '../utils/axiosInstance';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if user is not authenticated or not an admin
    if (status !== 'authenticated' || session?.user?.role !== 'admin') {
      router.push('/adminLogin'); // Redirect to login page if not an admin
    } else {
      const fetchUsers = async () => {
        try {
          const response = await axiosInstance.get('/users');
          setUsers(response.data);
        } catch (err) {
          setError('Error fetching users');
        }
      };
      fetchUsers();
    }
  }, [status, session, router]);

  const handleDeleteUser = async (userId) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const handleCreateProduct = () => {
    router.push('/admin/create-product');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <p>{error}</p>}
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateProduct}>Create Product</button>
    </div>
  );
};

export default AdminDashboard;
