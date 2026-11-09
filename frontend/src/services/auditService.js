import api from "./api";

// ----------------------------
// Run Audit
// ----------------------------
export const runAudit = async (url) => {
  try {
    const response = await api.post("/audit", { url });
    return response.data;
  } catch (error) {
    console.error("Audit Error:", error);
    throw error;
  }
};

// ----------------------------
// Get All Reports
// ----------------------------
export const getReports = async () => {
  try {
    const response = await api.get("/reports");
    return response.data;
  } catch (error) {
    console.error("Fetch Reports Error:", error);
    throw error;
  }
};