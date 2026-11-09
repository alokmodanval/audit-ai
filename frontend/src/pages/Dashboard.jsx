import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ReportCard from "../components/ReportCard";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:5000";

  const reportSectionRef = useRef();

  // ----------------------------
  // Fetch Reports
  // ----------------------------
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/reports`);
      if (response.data.success) {
        setReports(response.data.data || []);
      } else {
        throw new Error("Failed to fetch reports");
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
      alert("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Delete Report
  // ----------------------------
  const deleteReport = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const res = await axios.delete(`${API_URL}/report/${id}`);
      if (res.data.success) {
        setReports((prev) => prev.filter((r) => r.id !== id));
        alert("Report deleted successfully ✅");
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete report ❌");
    }
  };

  // ----------------------------
  // Export Dashboard PDF
  // ----------------------------
  const exportDashboardPDF = async () => {
    const input = reportSectionRef.current;
    if (!input) {
      alert("No dashboard content to export");
      return;
    }

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("dashboard-reports.pdf");
  };

  // ----------------------------
  // Export Individual Report PDF
  // ----------------------------
  const exportReportPDF = async (reportId) => {
    const element = document.getElementById(`report-${reportId}`);
    if (!element) {
      alert("Report not found");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`report-${reportId}.pdf`);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Dashboard</h1>

      {/* Quick Action */}
      <div style={styles.actionBox}>
        <Link to="/audit" style={styles.button}>
          🚀 Start Audit
        </Link>

        <button onClick={fetchReports} style={styles.refreshBtn}>
          🔄 Refresh
        </button>

        <button onClick={exportDashboardPDF} style={styles.exportBtn}>
          📄 Export Dashboard
        </button>
      </div>

      {/* Loader */}
      {loading && <Loader text="Loading reports..." />}

      {/* Empty State */}
      {!loading && reports.length === 0 && (
        <p style={styles.empty}>No reports yet. Run your first audit!</p>
      )}

      {/* Reports Section */}
      {!loading && reports.length > 0 && (
        <div ref={reportSectionRef} style={styles.reportList}>
          {reports.map((report) => (
            <div key={report.id} style={styles.reportCardWrapper} id={`report-${report.id}`}>
              <ReportCard report={report} />

              {/* Delete Button */}
              <button
                style={styles.deleteBtn}
                onClick={() => deleteReport(report.id)}
                title="Delete Report"
              >
                🗑️
              </button>

              {/* Export Individual Report Button */}
              <button
                style={styles.exportIndividualBtn}
                onClick={() => exportReportPDF(report.id)}
                title="Export Individual Report"
              >
                📄
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
  },
  actionBox: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    textAlign: "center",
  },
  button: {
    marginRight: "10px",
    padding: "10px 20px",
    background: "#38bdf8",
    color: "#000",
    borderRadius: "5px",
    fontWeight: "bold",
    textDecoration: "none",
  },
  refreshBtn: {
    marginRight: "10px",
    padding: "10px 20px",
    background: "#22c55e",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  exportBtn: {
    padding: "10px 20px",
    background: "#f43f5e",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  reportList: {
    display: "grid",
    gap: "20px",
  },
  reportCardWrapper: {
    position: "relative",
  },
  deleteBtn: {
    position: "absolute",
    top: "10px",
    right: "40px",
    background: "#f87171",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  exportIndividualBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#38bdf8",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  },
  empty: {
    textAlign: "center",
    marginTop: "20px",
    opacity: 0.7,
  },
};