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

  useEffect(() => {
    fetchBookings();
  }, []);

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

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#0a0a0a" }}>

      {/* PROFILE HEADER */}
      <div
        className="border-b px-6 py-10"
        style={{ borderColor: "#1a1a1a" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* AVATAR */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#facc15" }}
          >
            <span className="text-black font-black text-3xl">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>

          {/* INFO */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black text-white uppercase">
                {user?.name || "Player"}
              </h1>
              {user?.role === "admin" && (
                <span
                  className="text-xs font-black px-3 py-1 uppercase tracking-wider"
                  style={{ backgroundColor: "#facc15", color: "#000" }}
                >
                  Admin
                </span>
              )}
            </div>
            <p className="text-gray-500 text-sm mb-4">{user?.email}</p>

            {/* STATS ROW */}
            <div className="flex gap-8">
              <div>
                <p className="text-yellow-400 font-black text-2xl">{bookings.length}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Total</p>
              </div>
              <div>
                <p className="text-green-400 font-black text-2xl">{bookedCount}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Active</p>
              </div>
              <div>
                <p className="text-red-400 font-black text-2xl">{cancelledCount}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider">Cancelled</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="px-5 py-2.5 font-bold text-sm uppercase tracking-wider rounded-lg transition"
                style={{ backgroundColor: "#1a3c1a", color: "#fff" }}
              >
                Admin Panel
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 font-bold text-sm uppercase tracking-wider rounded-lg transition border text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500"
              style={{ borderColor: "#2a2a2a" }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* BOOKINGS SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">
            Booking History
          </h2>
          <button
            onClick={() => navigate("/turfs")}
            className="text-sm font-bold uppercase tracking-wider px-5 py-2 rounded-lg transition"
            style={{ backgroundColor: "#facc15", color: "#000" }}
          >
            Book New Slot →
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-sm">Loading bookings...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && bookings.length === 0 && (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{ borderColor: "#1a1a1a", backgroundColor: "#111" }}
          >
            <p className="text-5xl mb-4">📅</p>
            <p className="text-white font-bold text-lg mb-2">No bookings yet</p>
            <p className="text-gray-600 text-sm mb-6">Book your first turf slot today!</p>
            <button
              onClick={() => navigate("/turfs")}
              className="font-black text-black px-8 py-3 uppercase tracking-wider rounded-lg"
              style={{ backgroundColor: "#facc15" }}
            >
              Explore Turfs →
            </button>
          </div>
        )}

        {/* BOOKINGS LIST */}
        {!loading && bookings.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border transition-all duration-200"
                style={{
                  backgroundColor: "#111",
                  borderColor: b.status === "booked" ? "#1a2a1a" : "#2a1a1a",
                }}
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  {/* STATUS DOT */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: b.status === "booked" ? "#22c55e" : "#ef4444"
                    }}
                  />

                  <div>
                    <h3 className="text-white font-bold text-base">
                      ⚽ {b.turf?.name || "Turf"}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-gray-500 text-xs">
                        📅 {b.slot?.date || "N/A"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        🕐 {b.slot?.startTime} — {b.slot?.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* STATUS BADGE */}
                  <span
                    className="text-xs font-black px-3 py-1.5 uppercase tracking-wider rounded-full"
                    style={{
                      backgroundColor: b.status === "booked" ? "#14532d" : "#2a1a1a",
                      color: b.status === "booked" ? "#4ade80" : "#f87171",
                    }}
                  >
                    {b.status === "booked" ? "Active" : "Cancelled"}
                  </span>

                  {/* CANCEL BUTTON */}
                  {b.status === "booked" && (
                    <button
                      onClick={() => handleCancel(b._id)}
                      disabled={cancellingId === b._id}
                      className="text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 hover:bg-red-500 hover:text-white hover:border-red-500 disabled:opacity-50"
                      style={{ borderColor: "#2a2a2a", color: "#ef4444" }}
                    >
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
