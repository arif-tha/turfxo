import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [filter, setFilter] = useState("all");
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
    if (!window.confirm("Cancel this booking? Full refund will be initiated automatically (5-7 business days).")) return;
    setCancellingId(id);
    try {
      const res = await fetch(`https://turfxo-backend-2.onrender.com/api/bookings/cancel/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
        alert("✅ Booking cancelled! Refund will be credited in 5-7 business days.");
      } else {
        alert(data.message);
      }
    } catch {
      alert("Error cancelling booking");
    } finally {
      setCancellingId(null);
    }
  };

  const calcDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;
    const [sh, sm] = startTime.split(":").map(Number);
    let [eh, em] = endTime.split(":").map(Number);
    let start = sh * 60 + sm, end = eh * 60 + em;
    if (end <= start) end += 24 * 60;
    return (end - start) / 60;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric"
      });
    } catch { return dateStr; }
  };

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const bookedCount = bookings.filter(b => b.status === "booked").length;
  const cancelledCount = bookings.filter(b => b.status === "cancelled").length;
  const totalSpent = bookings
    .filter(b => b.paymentStatus === "paid" || b.paymentStatus === "refunded")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="min-h-screen pt-20 pb-10" style={{ backgroundColor: "#0a0a0a" }}>

      {/* HEADER */}
      <div className="border-b px-6 py-8" style={{ borderColor: "#1a1a1a" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-wider">My Bookings</h1>
              <p className="text-gray-500 text-sm mt-1">Your turf booking history</p>
            </div>
            <button onClick={() => navigate("/turfs")}
              className="font-black text-black px-5 py-2.5 rounded-lg text-sm uppercase tracking-wider transition"
              style={{ backgroundColor: "#facc15" }}>
              Book New →
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total Bookings", value: bookings.length, color: "#facc15" },
              { label: "Active", value: bookedCount, color: "#4ade80" },
              { label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, color: "#facc15" },
            ].map(({ label, value, color }) => (
              <div key={label} className="rounded-xl p-4 border" style={{ backgroundColor: "#111", borderColor: "#1a1a1a" }}>
                <p style={{ color }} className="font-black text-xl">{value}</p>
                <p className="text-gray-600 text-xs uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="max-w-4xl mx-auto px-6 mt-6">
        <div className="flex gap-2 mb-6">
          {[
            { key: "all", label: `All (${bookings.length})` },
            { key: "booked", label: `Active (${bookedCount})` },
            { key: "cancelled", label: `Cancelled (${cancelledCount})` },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)}
              className="px-4 py-2 rounded-lg text-sm font-bold transition"
              style={{
                backgroundColor: filter === key ? "#facc15" : "#111",
                color: filter === key ? "#000" : "#666",
                border: `1px solid ${filter === key ? "#facc15" : "#1a1a1a"}`,
              }}>
              {label}
            </button>
          ))}
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
          <div className="text-center py-20 rounded-2xl border" style={{ borderColor: "#1a1a1a", backgroundColor: "#111" }}>
            <p className="text-5xl mb-4">📅</p>
            <p className="text-white font-bold text-lg mb-2">No bookings yet</p>
            <p className="text-gray-600 text-sm mb-6">Book your first turf slot today!</p>
            <button onClick={() => navigate("/turfs")}
              className="font-black text-black px-8 py-3 uppercase tracking-wider rounded-lg"
              style={{ backgroundColor: "#facc15" }}>
              Explore Turfs →
            </button>
          </div>
        )}

        {/* BOOKINGS LIST */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-3">
            {filtered.map((b) => (
              <div key={b._id}
                className="rounded-xl border p-5 transition-all duration-200"
                style={{
                  backgroundColor: "#111",
                  borderColor: b.status === "booked" ? "#1a2a1a" : "#2a1a1a",
                }}>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: b.status === "booked" ? "#22c55e" : "#ef4444" }} />

                    <div className="flex-1">
                      <h3 className="text-white font-bold text-base">⚽ {b.turf?.name || "Turf"}</h3>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                        {/* Slot date */}
                        <span className="text-gray-400 text-xs">📅 {b.date || "—"}</span>
                        {/* Slot time */}
                        <span className="text-gray-400 text-xs">🕐 {b.startTime} — {b.endTime}</span>
                        {/* Duration */}
                        <span className="text-gray-400 text-xs">⏱ {calcDuration(b.startTime, b.endTime)} hr</span>
                        {/* Players */}
                        {b.players > 0 && (
                          <span className="text-gray-400 text-xs">👥 {b.players} player{b.players > 1 ? "s" : ""}</span>
                        )}
                        {/* ✅ Booked on */}
                        <span className="text-gray-600 text-xs">🗓 Booked on: {formatDate(b.createdAt)}</span>
                      </div>

                      {/* ✅ Refund status */}
                      {b.status === "cancelled" && b.refundStatus === "initiated" && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "#14532d", color: "#4ade80" }}>
                          💸 Refund Initiated — 5-7 business days
                        </div>
                      )}
                      {b.status === "cancelled" && b.refundStatus === "failed" && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "#2a1a1a", color: "#f87171" }}>
                          ⚠️ Refund Failed — Contact support
                        </div>
                      )}
                      {b.status === "cancelled" && b.refundStatus === "not_applicable" && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "#1a1a1a", color: "#666" }}>
                          No refund applicable
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 flex-shrink-0 ml-7 sm:ml-0">
                    {/* Amount */}
                    <span className="text-yellow-400 font-black text-base">₹{b.totalPrice}</span>

                    {/* Payment badge */}
                    <span className="text-xs font-black px-2.5 py-1 rounded-full uppercase"
                      style={{
                        backgroundColor:
                          b.paymentStatus === "paid" ? "#14532d" :
                          b.paymentStatus === "refunded" ? "#1a2a3a" : "#2a1a1a",
                        color:
                          b.paymentStatus === "paid" ? "#4ade80" :
                          b.paymentStatus === "refunded" ? "#60a5fa" : "#facc15",
                      }}>
                      {b.paymentStatus || "pending"}
                    </span>

                    {/* Status badge */}
                    <span className="text-xs font-black px-3 py-1.5 uppercase tracking-wider rounded-full"
                      style={{
                        backgroundColor: b.status === "booked" ? "#14532d" : "#2a1a1a",
                        color: b.status === "booked" ? "#4ade80" : "#f87171",
                      }}>
                      {b.status === "booked" ? "Active" : b.status}
                    </span>

                    {/* Cancel button */}
                    {b.status === "booked" && (
                      <button onClick={() => handleCancel(b._id)} disabled={cancellingId === b._id}
                        className="text-xs font-bold uppercase px-4 py-1.5 rounded-full border transition-all hover:bg-red-500 hover:text-white hover:border-red-500 disabled:opacity-50"
                        style={{ borderColor: "#2a2a2a", color: "#ef4444" }}>
                        {cancellingId === b._id ? "..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No filtered results */}
        {!loading && bookings.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "#1a1a1a", backgroundColor: "#111" }}>
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 font-semibold">No {filter} bookings found</p>
          </div>
        )}

        <button onClick={() => navigate("/profile")}
          className="mt-8 text-gray-600 text-sm hover:text-gray-400 transition">
          ← Back to Profile
        </button>
      </div>
    </div>
  );
}

export default MyBookings;