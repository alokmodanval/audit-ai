import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const Chart = ({ data }) => {
  if (!data) return null;

  const chartData = [
    { name: "SEO", score: data.seo },
    { name: "Performance", score: data.performance },
    { name: "Accessibility", score: data.accessibility },
    { name: "Security", score: data.security },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>📊 Audit Scores</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
  },
};