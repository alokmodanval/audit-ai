import api from "./api";

// ----------------------------
// Register User
// ----------------------------
export const registerUser = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

// ----------------------------
// Login User
// ----------------------------
export const loginUser = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

// ----------------------------
// Logout (frontend only)
// ----------------------------
export const logoutUser = () => {
  localStorage.removeItem("user");
};