import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  console.log("USER:", user);        // ← dekho kya aa raha hai
  console.log("ROLE:", user?.role);  // ← role dekho
  console.log("TOKEN:", token);      // ← token hai ya nahi

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (user.role !== "admin") {
    return <h1 className="text-center mt-10 text-red-500">❌ Access Denied (Admin Only)</h1>;
  }

  return children;
}

export default AdminRoute;