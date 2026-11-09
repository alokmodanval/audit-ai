import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ReportCard from "../components/ReportCard";

const ReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:5000";

  // ----------------------------
  // Fetch Reports
  // ----------------------------
  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/reports`, {
        headers: {
          user_id: "1", // demo user
        },
      });

      setReports(response.data.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📄 Audit Reports</h1>

      {/* Loader */}
      {loading && <Loader text="Loading reports..." />}

      {/* Empty State */}
      {!loading && reports.length === 0 && (
        <p style={styles.empty}>No reports available</p>
      )}

      {/* Report List */}
      {!loading && reports.length > 0 && (
        <div style={styles.list}>
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  list: {
    marginTop: "20px",
  },
  empty: {
    textAlign: "center",
    opacity: 0.7,
  },
};