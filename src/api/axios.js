import axios from "axios";

const API = axios.create({
  baseURL: "https://turfxo-backend-2.onrender.com/api", // ✅ https + /api dono add kiye
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;