import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Function to refresh the token
const refreshToken = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/refresh', {
      token: localStorage.getItem('refreshToken'), // Send the refresh token
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken); // Update the access token
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// Add a response interceptor to handle token expiry
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized and ensure it's not a retried request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // Update the header
        return axiosInstance(originalRequest); // Retry the original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default axiosInstance;
