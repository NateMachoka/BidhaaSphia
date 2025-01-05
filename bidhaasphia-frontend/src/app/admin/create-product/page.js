'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axiosInstance from '../../utils/axiosInstance';

const AdminCreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    file: null,
  });
  const [error, setError] = useState('');

  const { data: session } = useSession();
  const user = session?.user?.id || '';

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    setError('You must be logged in to create a product');
    return;
  }

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.name);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('stock', formData.stock);
  formDataToSend.append('category', formData.category);

  if (formData.file) {
    formDataToSend.append('image', formData.file);
  } else {
    setError('Please upload an image file.');
    return;
  }

  formDataToSend.append('user', user);

  // Log for debugging
  console.log('FormData being sent:');
  for (let [key, value] of formDataToSend.entries()) {
    console.log(`${key}:`, value);
  }

  try {
    const response = await axiosInstance.post('/products', formDataToSend, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('Product created:', response.data);
  } catch (error) {
    setError('Error creating product');

    console.error('Error response status:', error.response?.status);
    console.error('Error response data:', error.response?.data);
    console.error('Error response headers:', error.response?.headers);
    console.error('Full error object:', error);
  }
};

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="file"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdminCreateProduct;
