import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    err.displayMessage =
      err.response?.data?.error?.message || err.message || "Request failed";
    err.details = err.response?.data?.error?.details;
    return Promise.reject(err);
  },
);

