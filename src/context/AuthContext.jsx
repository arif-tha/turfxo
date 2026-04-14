// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios"; // ✅ axios instance with interceptor

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for initial load

  // 🔹 LOAD USER ON REFRESH
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ /auth/me call with token attached automatically via Axios interceptor
      API.get("/auth/me")
        .then((res) => {
          setUser(res.data.user); // user object includes role
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
      const res = await API.post("/auth/login", formData);

      if (res.data.success) {
        const { token, user } = res.data;

        // ✅ Save token
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
      const res = await API.post("/auth/register", formData);

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

// 🔹 Custom hook
export function useAuth() {
  return useContext(AuthContext);
}