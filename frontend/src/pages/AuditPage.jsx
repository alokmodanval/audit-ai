import jsPDF from "jspdf";
import { useState } from "react";
import AuditForm from "../components/AuditForm";
import Chart from "../components/Chart";
import Loader from "../components/Loader";
import ScoreCard from "../components/ScoreCard";

const AuditPage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [explanations, setExplanations] = useState({});

  const handleAudit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      setResult(data.data || data);
      setExplanations({});
      setLoading(false);
    }, 500);
  };

  const explainIssue = async (text) => {
    if (explanations[text]) {
      setExplanations((prev) => {
        const updated = { ...prev };
        delete updated[text];
        return updated;
      });
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ issue: text }),
      });

      const data = await res.json();

      setExplanations((prev) => ({
        ...prev,
        [text]: data.data?.explanation || "No explanation available",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const explainAllIssues = async () => {
    if (!result?.ai_suggestions) return;

    try {
      const newExplanations = {};
      const allItems = [
        ...(result.ai_suggestions.issues || []),
        ...(result.ai_suggestions.recommendations || []),
      ];

      for (const text of allItems) {
        const res = await fetch("http://127.0.0.1:5000/explain", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ issue: text }),
        });

        const data = await res.json();

        newExplanations[text] =
          data.data?.explanation || "No explanation available";
      }

      setExplanations(newExplanations);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPDF = () => {
    if (!result) {
      alert("No report to export");
      return;
    }

    const pdf = new jsPDF("p", "mm", "a4");

    const getColor = (score) => {
      if (score >= 90) return [34, 197, 94];
      if (score >= 50) return [234, 179, 8];
      return [239, 68, 68];
    };

    const addHeader = () => {
      try {
        pdf.addImage("/logo.png", "PNG", 10, 8, 12, 12);
      } catch {}

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text("Audit AI Report", 25, 15);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(`Generated: ${new Date().toLocaleString()}`, 25, 21);

      pdf.line(10, 25, 200, 25);
    };

    const addFooter = (page) => {
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Page ${page}`, 180, 290);
    };

    addHeader();
    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Overview", 10, 35);

    const scores = [
      { label: "Performance", value: result.performance?.score || 0 },
      { label: "SEO", value: result.seo || 0 },
      { label: "Accessibility", value: result.accessibility || 0 },
      { label: "Security", value: result.security || 0 },
    ];

    let y = 50;
    scores.forEach((item) => {
      const [r, g, b] = getColor(item.value);

      pdf.setFillColor(r, g, b);
      pdf.roundedRect(10, y - 5, 30, 10, 3, 3, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.text(`${item.value}`, 25, y + 1, { align: "center" });

      pdf.setTextColor(0, 0, 0);
      pdf.text(item.label, 50, y);

      y += 15;
    });

    addFooter(1);

    pdf.addPage();
    addHeader();

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Performance Details", 10, 35);

    pdf.setFontSize(11);
    pdf.text(`Score: ${result.performance?.score || 0}`, 10, 50);
    pdf.text(
      `Load Time: ${
        result.performance?.load_time_sec?.toFixed
          ? result.performance.load_time_sec.toFixed(2)
          : result.performance?.load_time_sec || "N/A"
      } sec`,
      10,
      60
    );
    pdf.text(
      `Status Code: ${result.performance?.status_code || "N/A"}`,
      10,
      70
    );

    addFooter(2);

    pdf.addPage();
    addHeader();

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("SEO, Accessibility & Security", 10, 35);

    pdf.setFontSize(11);
    pdf.text(`SEO Score: ${result.seo || 0}`, 10, 50);
    pdf.text(`Accessibility Score: ${result.accessibility || 0}`, 10, 60);
    pdf.text(`Security Score: ${result.security || 0}`, 10, 70);

    addFooter(3);

    pdf.addPage();
    addHeader();

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text("AI Suggestions", 10, 35);

    let aiY = 50;

    const ensurePageSpace = (needed = 10) => {
      if (aiY + needed > 280) {
        pdf.addPage();
        addHeader();
        aiY = 40;
      }
    };

    if (result.ai_suggestions?.summary) {
      pdf.setFontSize(11);
      pdf.text("Summary:", 10, aiY);
      aiY += 7;

      pdf.setFontSize(10);
      const summaryLines = pdf.splitTextToSize(
        result.ai_suggestions.summary,
        180
      );
      pdf.text(summaryLines, 10, aiY);
      aiY += summaryLines.length * 5 + 5;
    }

    if (result.ai_suggestions?.issues?.length > 0) {
      ensurePageSpace(15);
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Issues & Explanations:", 10, aiY);
      aiY += 7;

      result.ai_suggestions.issues.forEach((item) => {
        ensurePageSpace(12);

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        const issueLines = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(issueLines, 12, aiY);
        aiY += issueLines.length * 5 + 1;

        if (explanations[item]) {
          pdf.setFontSize(9);
          pdf.setTextColor(90, 90, 90);
          const expLines = pdf.splitTextToSize(explanations[item], 170);
          pdf.text(expLines, 15, aiY);
          aiY += expLines.length * 5 + 4;
        }
      });
    }

    if (result.ai_suggestions?.recommendations?.length > 0) {
      ensurePageSpace(15);
      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Recommendations & Explanations:", 10, aiY);
      aiY += 7;

      result.ai_suggestions.recommendations.forEach((item) => {
        ensurePageSpace(12);

        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        const recLines = pdf.splitTextToSize(`• ${item}`, 180);
        pdf.text(recLines, 12, aiY);
        aiY += recLines.length * 5 + 1;

        if (explanations[item]) {
          pdf.setFontSize(9);
          pdf.setTextColor(90, 90, 90);
          const expLines = pdf.splitTextToSize(explanations[item], 170);
          pdf.text(expLines, 15, aiY);
          aiY += expLines.length * 5 + 4;
        }
      });
    }

    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      addFooter(i);
    }

    pdf.save("audit-report.pdf");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚀 Website Audit</h1>

      <AuditForm onResult={handleAudit} />

      {loading && <Loader text="Analyzing website..." />}

      {result && !loading && (
        <>
          <button onClick={downloadPDF} style={styles.pdfBtn}>
            📄 Export Report
          </button>

          <div style={styles.cards}>
            <ScoreCard
              title="Performance"
              score={result.performance?.score || 0}
            />
            <ScoreCard title="SEO" score={result.seo || 0} />
            <ScoreCard
              title="Accessibility"
              score={result.accessibility || 0}
            />
            <ScoreCard title="Security" score={result.security || 0} />
          </div>

          <Chart
            data={{
              performance: result.performance?.score || 0,
              seo: result.seo || 0,
              accessibility: result.accessibility || 0,
              security: result.security || 0,
            }}
          />

          {result.ai_suggestions && (
            <div style={styles.aiBox}>
              <h3>🤖 AI Suggestions</h3>

              <p>
                <strong>Summary:</strong> {result.ai_suggestions.summary}
              </p>

              <h4>Issues:</h4>

              <button style={styles.explainAllBtn} onClick={explainAllIssues}>
                🤖 Explain All
              </button>

              {result.ai_suggestions.issues?.map((item, index) => (
                <div key={index} style={styles.issueBox}>
                  <div style={styles.issueRow}>
                    <span>• {item}</span>

                    <button
                      style={styles.explainBtn}
                      onClick={() => explainIssue(item)}
                    >
                      {explanations[item] ? "Hide" : "Explain"}
                    </button>
                  </div>

                  {explanations[item] && (
                    <div style={styles.explanationBox}>
                      {explanations[item]}
                    </div>
                  )}
                </div>
              ))}

              <h4>Recommendations:</h4>

              {result.ai_suggestions.recommendations?.map((item, index) => (
                <div key={index} style={styles.issueBox}>
                  <div style={styles.issueRow}>
                    <span>• {item}</span>

                    <button
                      style={styles.explainBtn}
                      onClick={() => explainIssue(item)}
                    >
                      {explanations[item] ? "Hide" : "Explain"}
                    </button>
                  </div>

                  {explanations[item] && (
                    <div style={styles.explanationBox}>
                      {explanations[item]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuditPage;

const styles = {
  container: {
    padding: "20px",
    background: "#020617",
    minHeight: "100vh",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  cards: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  aiBox: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  pdfBtn: {
    padding: "10px 20px",
    background: "#f43f5e",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
  },
  explainAllBtn: {
    marginBottom: "10px",
    padding: "8px 15px",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "#000",
    cursor: "pointer",
    fontWeight: "bold",
  },
  issueBox: {
    marginBottom: "12px",
  },
  issueRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
    gap: "12px",
  },
  explainBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    flexShrink: 0,
  },
  explanationBox: {
    background: "#0f172a",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "13px",
    color: "#cbd5f5",
  },
};