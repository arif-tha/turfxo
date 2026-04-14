// Format date (future use)
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};