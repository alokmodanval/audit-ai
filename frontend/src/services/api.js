import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------
// Request Interceptor
// ----------------------------
api.interceptors.request.use(
  (config) => {
    // Add user_id (demo purpose)
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id) {
      config.headers["user_id"] = user.id;
    } else {
      config.headers["user_id"] = "1"; // fallback demo user
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------
// Response Interceptor
// ----------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;