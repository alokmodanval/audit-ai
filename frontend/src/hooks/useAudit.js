import { useState } from "react";
import { runAudit } from "../services/auditService";

const useAudit = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------------
  // Run Audit
  // ----------------------------
  const startAudit = async (url) => {
    try {
      setLoading(true);
      setError(null);

      const result = await runAudit(url);

      setData(result.data || result); // handle formatted response

    } catch (err) {
      console.error(err);
      setError("Audit failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Reset State
  // ----------------------------
  const resetAudit = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    loading,
    error,
    startAudit,
    resetAudit,
  };
};

export default useAudit;