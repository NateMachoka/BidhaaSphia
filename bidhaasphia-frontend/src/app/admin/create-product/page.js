'use client'

import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AdminCreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [user, setUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('image', file);
    formData.append('user', user);

    try {
      const response = await axiosInstance.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Product created:', response.data);
    } catch (error) {
      setError('Error creating product');
      
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // Request was made, but no response received
        console.error('Error request:', error.request);
      } else {
        // Something else caused the error
        console.error('Error message:', error.message);
      }

      console.error('Full error object:', error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>
        <div>
          <label>User ID</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <button type="submit">Create Product</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminCreateProduct;
