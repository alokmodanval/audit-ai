import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",   // ✅ FIXED (was "name")
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Handle Input
  // ----------------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ----------------------------
  // Handle Submit
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,  // ✅ correct key
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Registration successful ✅");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Register</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"   // ✅ FIXED
          placeholder="Enter username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;

// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "50px auto",
    background: "#1e293b",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px",
    background: "#38bdf8",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};