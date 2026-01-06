//axios instance with base URL and headers
import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (เช่น ใส่ token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle error, refresh token, etc.)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Unauthorized
      if (error.response.status === 401) {
        // ลบ token, redirect, หรือแจ้งเตือน
        localStorage.removeItem("access_token");
        // window.location.href = "/login";
      }
      // Handle error อื่นๆ
      // เช่น 403, 404, 500
    } else if (error.request) {
      // Network error
      alert("Network error. Please try again.");
    } else {
      // อื่นๆ
      alert("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);
