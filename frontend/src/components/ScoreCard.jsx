
const ScoreCard = ({ title, score }) => {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = score || 0;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // ----------------------------
  // Color Logic
  // ----------------------------
  const getColor = (score) => {
    if (score >= 90) return "#22c55e"; // green
    if (score >= 50) return "#facc15"; // yellow
    return "#ef4444"; // red
  };

  const color = getColor(progress);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>

      <svg height={radius * 2} width={radius * 2}>
        {/* Background circle */}
        <circle
          stroke="#334155"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Score text */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fill="#fff"
          fontSize="18"
          fontWeight="bold"
        >
          {progress}
        </text>
      </svg>
    </div>
  );
};

export default ScoreCard;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    width: "150px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "10px",
    fontSize: "14px",
    opacity: 0.8,
  },
};