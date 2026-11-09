const Loader = ({ text = "Analyzing..." }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

export default Loader;


// ----------------------------
// Styles
// ----------------------------
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #334155",
    borderTop: "5px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "15px",
    fontSize: "16px",
  },
};