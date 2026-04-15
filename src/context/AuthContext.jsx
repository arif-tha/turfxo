// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 LOAD USER ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.get("/api/auth/me") // ✅ FIXED
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // 🔐 LOGIN
  const login = async (formData) => {
    try {
      const res = await API.post("/api/auth/login", formData); // ✅ FIXED

      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        setUser(user);
        return { success: true, user, token };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // 🔐 REGISTER
  const register = async (formData) => {
    try {
      const res = await API.post("/api/auth/register", formData); // ✅ FIXED

      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        setUser(user);
        return { success: true, user, token };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Register failed",
      };
    }
  };

  // 🔓 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}