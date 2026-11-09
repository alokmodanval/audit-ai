import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>🚀 Audit AI</h1>
        <p style={styles.subtitle}>
          AI-powered website auditing tool to analyze performance, SEO,
          accessibility, and security.
        </p>

        <Link to="/audit" style={styles.button}>
          🔍 Start Auditing
        </Link>
      </div>

      {/* Features Section */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>⚡ Performance</h3>
          <p>Analyze website speed and optimization issues.</p>
        </div>

        <div style={styles.card}>
          <h3>🔍 SEO</h3>
          <p>Check SEO score and improve search visibility.</p>
        </div>

        <div style={styles.card}>
          <h3>♿ Accessibility</h3>
          <p>Ensure your site is accessible for all users.</p>
        </div>

        <div style={styles.card}>
          <h3>🔒 Security</h3>
          <p>Identify security risks and vulnerabilities.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  hero: {
    marginTop: "50px",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    maxWidth: "600px",
    margin: "0 auto 20px",
    opacity: 0.8,
  },
  button: {
    padding: "12px 25px",
    background: "#38bdf8",
    color: "#000",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "50px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },
};