const ReportCard = ({ report }) => {
  if (!report) return null;

  // ----------------------------
  // Explain Issue Function
  // ----------------------------
  const explainIssue = async (issue) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ issue }),
      });

      const data = await res.json();

      alert(data.data.explanation);
    } catch (err) {
      console.error(err);
      alert("Failed to get explanation");
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.url}>🌐 {report.url}</h3>

      {/* Scores */}
      <div style={styles.scores}>
        <div style={styles.item}>
          <span>⚡ Performance</span>
          <strong>{report.performance}</strong>
        </div>

        <div style={styles.item}>
          <span>🔍 SEO</span>
          <strong>{report.seo}</strong>
        </div>

        <div style={styles.item}>
          <span>♿ Accessibility</span>
          <strong>{report.accessibility}</strong>
        </div>

        <div style={styles.item}>
          <span>🔒 Security</span>
          <strong>{report.security}</strong>
        </div>
      </div>

      {/* ----------------------------
          AI Suggestions 🔥
      ---------------------------- */}
      {report.ai_suggestions && (
        <div style={styles.aiBox}>
          <h4 style={styles.aiHeading}>🤖 AI Suggestions</h4>

          {/* Summary */}
          <p style={styles.summary}>
            <strong>Summary:</strong> {report.ai_suggestions.summary}
          </p>

          {/* Issues */}
          <div>
            <strong>Issues:</strong>
            {report.ai_suggestions.issues?.map((issue, i) => (
              <div key={i} style={styles.issueItem}>
                <span>• {issue}</span>

                <button
                  style={styles.explainBtn}
                  onClick={() => explainIssue(issue)}
                >
                  Explain
                </button>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div style={{ marginTop: "10px" }}>
            <strong>Recommendations:</strong>
            {report.ai_suggestions.recommendations?.map((rec, i) => (
              <p key={i}>✔ {rec}</p>
            ))}
          </div>
        </div>
      )}

      {/* Date */}
      {report.created_at && (
        <p style={styles.date}>
          📅 {new Date(report.created_at).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ReportCard;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  url: {
    marginBottom: "10px",
    color: "#38bdf8",
    wordBreak: "break-all",
  },
  scores: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    marginTop: "10px",
  },
  item: {
    background: "#0f172a",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  aiBox: {
    marginTop: "15px",
    background: "#020617",
    padding: "15px",
    borderRadius: "8px",
  },
  aiHeading: {
    marginBottom: "10px",
    color: "#22c55e",
  },
  summary: {
    marginBottom: "10px",
  },
  issueItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  explainBtn: {
    marginLeft: "10px",
    padding: "4px 8px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#000",
  },
  date: {
    marginTop: "10px",
    fontSize: "12px",
    opacity: 0.7,
  },
};