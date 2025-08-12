import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status || 500;
    switch (status) {
      case 401:
        toast.error("Unauthorized. Please login.");
        break;
      case 403:
        toast.error("You don't have permission to access this resource.");
        break;
      default:
        toast.error("An error occurred. Please try again later.");
        break;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
