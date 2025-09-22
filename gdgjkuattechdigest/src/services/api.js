import axios from 'axios';

// Use import.meta.env for Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://gdgjkuattechdigest.onrender.com';
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'gdg-jkuat-2024-admin-secure-key-xyz789ABC';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token for admin requests
api.interceptors.request.use(
  (config) => {
    // Add admin token for protected routes
    if (config.requiresAuth) {
      config.headers.Authorization = `Bearer ${ADMIN_TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access - invalid admin token');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api;