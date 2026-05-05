import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://turfxo-backend-2.onrender.com/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(data.data || []);
    } catch {
      console.error("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    setCancellingId(id);
    try {
      const res = await fetch(`https://turfxo-backend-2.onrender.com/api/bookings/cancel/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchBookings();
      else alert(data.message);
    } catch {
      alert("Error cancelling booking");
    } finally {
      setCancellingId(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const bookedCount = bookings.filter(b => b.status === "booked").length;
  const cancelledCount = bookings.filter(b => b.status === "cancelled").length;
  const totalSpent = bookings
    .filter(b => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="min-h-screen pt-20 bg-premium-bg">

      {/* PROFILE HEADER */}
      <div className="border-b px-6 py-10 border-premium-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* AVATAR */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-premium-accent">
            <span className="text-white font-black text-3xl">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>

          {/* INFO */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-premium-text uppercase">{user?.name || "Player"}</h1>
              {user?.role === "admin" && (
                <span className="text-xs font-black px-3 py-1 uppercase tracking-wider bg-premium-accent text-white rounded">
                  Admin
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4">{user?.email}</p>

            {/* STATS ROW */}
            <div className="flex gap-8">
              <div>
                <p className="text-premium-accent font-black text-2xl">{bookings.length}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Total</p>
              </div>
              <div>
                <p className="text-green-600 font-black text-2xl">{bookedCount}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Active</p>
              </div>
              <div>
                <p className="text-red-500 font-black text-2xl">{cancelledCount}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Cancelled</p>
              </div>
              <div>
                <p className="text-yellow-400 font-black text-2xl">₹{totalSpent.toLocaleString("en-IN")}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Spent</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            {user?.role === "admin" && (
              <button onClick={() => navigate("/admin")}
                className="px-5 py-2.5 font-bold text-sm uppercase tracking-wider rounded-lg transition bg-premium-accent text-white hover:bg-accent-hover">
                Admin Panel
              </button>
            )}
            <button onClick={handleLogout}
              className="px-5 py-2.5 font-bold text-sm uppercase tracking-wider rounded-lg transition border text-red-600 hover:bg-red-50 hover:border-red-200 border-premium-border">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* BOOKINGS SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-primary-text uppercase tracking-wider">Booking History</h2>
          <button onClick={() => navigate("/turfs")}
            className="text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition premium-btn-primary">
            Book New Slot →
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-premium-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Loading bookings...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-premium-border bg-premium-secondary">
            <p className="text-5xl mb-4">📅</p>
            <p className="text-primary-text font-bold text-lg mb-2">No bookings yet</p>
            <p className="text-gray-600 text-sm mb-6">Book your first turf slot today!</p>
            <button onClick={() => navigate("/turfs")}
              className="premium-btn-primary">
              Explore Turfs →
            </button>
          </div>
        )}

        {/* BOOKINGS LIST */}
        {!loading && bookings.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookings.map((b) => (
              <div key={b._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-200 bg-white"
                style={{
                  borderColor: b.status === "booked" ? "#DCFCE7" : "#FEE2E2",
                }}>

                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: b.status === "booked" ? "#22c55e" : "#ef4444" }} />
                  <div>
                    <h3 className="text-primary-text font-bold text-base">⚽ {b.turf?.name || "Turf"}</h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      {/* ✅ Fixed — b.date aur b.startTime use karo, b.slot nahi */}
                      <span className="text-gray-600 text-xs">📅 {b.date || "N/A"}</span>
                      <span className="text-gray-600 text-xs">🕐 {b.startTime} — {b.endTime}</span>
                      <span className="text-gray-600 text-xs">💰 ₹{b.totalPrice}</span>
                      {b.players && (
                        <span className="text-gray-600 text-xs">👥 {b.players} player{b.players > 1 ? "s" : ""}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Payment badge */}
                  <span className="text-xs font-black px-2 py-1 uppercase tracking-wider rounded-full"
                    style={{
                      backgroundColor: b.paymentStatus === "paid" ? "#DCFCE7" : "#F3E8FF",
                      color: b.paymentStatus === "paid" ? "#16A34A" : "#A855F7",
                    }}>
                    {b.paymentStatus || "pending"}
                  </span>

                  {/* Status badge */}
                  <span className="text-xs font-black px-3 py-1.5 uppercase tracking-wider rounded-full"
                    style={{
                      backgroundColor: b.status === "booked" ? "#DCFCE7" : "#FEE2E2",
                      color: b.status === "booked" ? "#16A34A" : "#DC2626",
                    }}>
                    {b.status === "booked" ? "Active" : b.status}
                  </span>

                  {/* Cancel button */}
                  {b.status === "booked" && (
                    <button onClick={() => handleCancel(b._id)} disabled={cancellingId === b._id}
                      className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 text-red-600"
                      style={{ borderColor: "#FCA5A5" }}>
                      {cancellingId === b._id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;