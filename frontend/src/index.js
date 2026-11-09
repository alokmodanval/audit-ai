import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context
import { AuthProvider } from "./context/AuthContext";

// Global CSS
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);