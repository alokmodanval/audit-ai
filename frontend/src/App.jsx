import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages
import AuditPage from "./pages/AuditPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/reports" element={<ReportPage />} />

        {/* Fallback */}
        <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;