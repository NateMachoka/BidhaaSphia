'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosInstance from '../utils/axiosInstance'; // Import the custom Axios instance

const UserProfile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    if (session?.accessToken) {
      // Fetch user profile data on load
      axiosInstance
        .get('/users/profile') // Base URL is already defined in the Axios instance
        .then((response) => {
          setProfile(response.data);
          setForm(response.data); // Initialize form with fetched data
        })
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!session?.accessToken) {
      alert('Token is missing');
      return;
    }

    // Send the updated form data to the backend
    axiosInstance
      .put('/users/profile', form) // Token is automatically added via Axios interceptor
      .then((response) => {
        alert('Profile updated successfully');
        setProfile(response.data.user); // Update local profile with the response data
      })
      .catch((error) => {
        alert('Error updating profile');
        console.error('Error:', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={form.gender || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={form.nationality || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
