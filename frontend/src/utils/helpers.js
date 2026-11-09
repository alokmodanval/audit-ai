// ----------------------------
// Format Score to Percentage
// ----------------------------
export const formatScore = (score) => {
  if (score === null || score === undefined) return "N/A";
  return `${Math.round(score)}%`;
};

// ----------------------------
// Format Date for Display
// ----------------------------
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString(); // e.g., 3/22/2026, 10:30 AM
};

// ----------------------------
// Validate URL
// ----------------------------
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// ----------------------------
// Capitalize First Letter
// ----------------------------
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};