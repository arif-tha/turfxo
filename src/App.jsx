import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import TurfZoneIntro from "./components/TurfZoneIntro";
import BookingReceipt from "./pages/BookingReceipt";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Turfs from "./pages/Turfs";
import Slots from "./pages/Slots";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./components/admin/AdminDashboard";
import AddTurf from "./components/admin/AddTurf";
import CreateSlots from "./components/admin/CreateSlots";
import AllBookings from "./components/admin/AllBookings";
import AdminUsers from "./components/admin/AdminUsers";

// Layout
function Layout() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <div className="min-h-screen">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/receipt" element={<BookingReceipt />} />

          {/* ✅ Bina login browse kar sako */}
          <Route path="/turfs" element={<Turfs />} />
          <Route path="/slots/:turfId" element={<Slots />} />

          {/* 🔐 Sirf profile private hai */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-turf"
            element={
              <AdminRoute>
                <AddTurf />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-slots"
            element={
              <AdminRoute>
                <CreateSlots />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AllBookings />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-red-500 mt-20 text-2xl font-bold">
                ❌ Page Not Found
              </h1>
            }
          />

        </Routes>
      </div>
    </>
  );
}

// 🔥 MAIN APP WITH INTRO CONTROL
function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {showIntro ? (
        <TurfZoneIntro />
      ) : (
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      )}
    </AuthProvider>
  );
}

export default App;