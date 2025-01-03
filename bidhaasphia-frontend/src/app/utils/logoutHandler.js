import axiosInstance from '../utils/axiosInstance';

export const logoutHandler = async () => {
  try {
    await axiosInstance.post('/users/logout'); // Call backend logout endpoint
    localStorage.removeItem('accessToken'); // Clear access token
    localStorage.removeItem('refreshToken'); // Clear refresh token
    window.location.href = '/'; // Redirect to homepage
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
