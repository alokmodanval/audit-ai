import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        🚀 Audit AI
      </div>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#020617",
    borderBottom: "1px solid #1e293b",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#38bdf8",
    fontWeight: "500",
  },
};