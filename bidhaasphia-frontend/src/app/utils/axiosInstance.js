'use client'

import axios from 'axios';

// Create an Axios instance with a base URL for the API
const axiosInstance = axios.create({
  baseURL: 'https://bidhaa-sphia-pmb5ccojk-natemachoka-gmailcoms-projects.vercel.app/api', // Update this to your production backend
});

// Add a request interceptor to attach the token from localStorage to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    // Handle request error without logging sensitive information
    return Promise.reject(error);
  }
);

// Function to refresh the token when it expires
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken'); // Get refresh token from localStorage

    const response = await axios.post('https://bidhaa-sphia-pmb5ccojk-natemachoka-gmailcoms-projects.vercel.app/api/users/refresh', {
      token: refreshToken, // Send the refresh token to the server
    });

    const { accessToken } = response.data; // Get the new access token

    localStorage.setItem('accessToken', accessToken); // Save the new access token to localStorage
    return accessToken; // Return the new token
  } catch (error) {
    // Handle error without logging sensitive information
    throw error; // Rethrow error if refresh fails
  }
};

// Add a response interceptor to handle token expiry and retry the request
axiosInstance.interceptors.response.use(
  (response) => response, // Just return the response if it's successful
  async (error) => {
    const originalRequest = error.config; // Get the original request

    // Check for 401 Unauthorized status and ensure it’s not a retried request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const newToken = await refreshToken(); // Attempt to refresh the token
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // Set the new token in the header
        return axiosInstance(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        return Promise.reject(refreshError); // Reject if refreshing the token fails
      }
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default axiosInstance;
