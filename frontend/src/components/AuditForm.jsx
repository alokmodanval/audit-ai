import axios from "axios";
import { useState } from "react";

const API_URL = "http://127.0.0.1:5000";

const AuditForm = ({ onResult }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Normalize URL (VERY IMPORTANT)
  // ----------------------------
  const normalizeUrl = (input) => {
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return "https://" + input;
    }
    return input;
  };

  // ----------------------------
  // Handle Submit
  // ----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      alert("Please enter a URL");
      return;
    }

    const finalUrl = normalizeUrl(url);

    console.log("Sending URL:", finalUrl); // ✅ DEBUG

    try {
      setLoading(true);

      // 🔥 DIRECT API CALL (bypassing auditService)
      const response = await axios.post(`${API_URL}/audit`, {
        url: finalUrl,   // ✅ THIS FIXES YOUR 400 ERROR
      });

      console.log("Response:", response.data); // ✅ DEBUG

      if (onResult) {
        onResult(response.data);
      }

    } catch (error) {
      console.error("Audit Error:", error?.response?.data || error.message);

      alert(
        error?.response?.data?.message ||
        "Audit failed. Check URL or backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌐 Website Audit</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter website URL (e.g. example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Analyzing..." : "Run Audit"}
        </button>
      </form>
    </div>
  );
};

export default AuditForm;

// ----------------------------
const styles = {
  container: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    width: "60%",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#38bdf8",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },
};