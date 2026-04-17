import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await fetch("https://turfxo-backend-2.onrender.com/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookings(data.data || []);
    } catch {
      alert("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async () => {
    if (!cancelId) return;
    try {
      const res = await fetch(`https://turfxo-backend-2.onrender.com/api/bookings/cancel/${cancelId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchBookings();
      else alert(data.message);
    } catch {
      alert("Error cancelling booking");
    } finally {
      setCancelId(null);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchPayment = filterPayment === "all" || b.paymentStatus === filterPayment;
    const matchDate = !filterDate || b.date === filterDate;
    const matchSearch =
      !search ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.turf?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.playerName?.toLowerCase().includes(search.toLowerCase()) || // ✅ player name search
      b.playerPhone?.includes(search); // ✅ phone search
    return matchStatus && matchPayment && matchDate && matchSearch;
  });

  const stats = {
    total: bookings.length,
    booked: bookings.filter((b) => b.status === "booked").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    paid: bookings.filter((b) => b.paymentStatus === "paid").length,
    pending: bookings.filter((b) => b.paymentStatus === "pending").length,
    failed: bookings.filter((b) => b.paymentStatus === "failed").length,
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading bookings...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* CANCEL MODAL */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-lg font-black text-gray-900 mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The slot will be freed.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-500 text-sm hover:bg-gray-50 transition">
                Keep it
              </button>
              <button onClick={handleCancel}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-bold hover:bg-red-600 transition">
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">📦 All Bookings</h1>
            <p className="text-gray-400 text-sm mt-1">Manage and monitor all bookings</p>
          </div>
          <button onClick={() => navigate("/admin")}
            className="text-sm text-gray-400 hover:text-gray-600 transition">
            ← Back to Dashboard
          </button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {[
            { label: "Total Bookings", value: stats.total,     color: "border-blue-400" },
            { label: "Active",         value: stats.booked,    color: "border-green-500" },
            { label: "Cancelled",      value: stats.cancelled, color: "border-red-400" },
            { label: "Paid",           value: stats.paid,      color: "border-emerald-500" },
            { label: "Pending",        value: stats.pending,   color: "border-yellow-400" },
            { label: "Failed",         value: stats.failed,    color: "border-rose-400" },
          ].map((s) => (
            <div key={s.label} className={`bg-white border border-gray-100 border-t-2 ${s.color} rounded-xl p-4`}>
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-black text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search user, turf, player name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 transition flex-1 min-w-40"
          />
          <input
            type="date" value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 transition"
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 transition">
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
          <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-green-500 transition">
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          {(filterStatus !== "all" || filterPayment !== "all" || filterDate || search) && (
            <button onClick={() => { setFilterStatus("all"); setFilterPayment("all"); setFilterDate(""); setSearch(""); }}
              className="text-sm text-red-400 hover:text-red-600 transition px-2">
              Clear filters
            </button>
          )}
        </div>

        {/* TABLE */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-gray-400 font-semibold">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    {["User", "Player Details", "Turf", "Date", "Time", "Players", "Price", "Booking", "Payment", "Payment ID", "Action"].map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b._id} className="border-b border-gray-50 hover:bg-gray-50 transition">

                      {/* User (account) */}
                      <td className="py-3 px-4">
                        <p className="font-semibold text-gray-800">{b.user?.name || "—"}</p>
                        <p className="text-xs text-gray-400">{b.user?.email}</p>
                      </td>

                      {/* ✅ Player Details — from form */}
                      <td className="py-3 px-4">
                        {b.playerName ? (
                          <>
                            <p className="font-semibold text-gray-800">{b.playerName}</p>
                            <p className="text-xs text-gray-400">{b.playerPhone || "—"}</p>
                          </>
                        ) : (
                          <span className="text-gray-300 text-xs">Not provided</span>
                        )}
                      </td>

                      {/* Turf */}
                      <td className="py-3 px-4 text-gray-700 font-medium whitespace-nowrap">
                        {b.turf?.name || "—"}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{b.date || "—"}</td>

                      {/* Time */}
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {b.startTime} — {b.endTime}
                      </td>

                      {/* ✅ Players count */}
                      <td className="py-3 px-4 text-center text-gray-700 font-semibold">
                        {b.players || "—"}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 text-gray-700 font-semibold whitespace-nowrap">
                        ₹{b.totalPrice}
                      </td>

                      {/* Booking Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          b.status === "booked"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : b.status === "cancelled"
                            ? "bg-red-50 text-red-500 border border-red-200"
                            : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}>
                          {b.status}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          b.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.paymentStatus === "failed"
                            ? "bg-rose-50 text-rose-500 border border-rose-200"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-200"
                        }`}>
                          {b.paymentStatus || "pending"}
                        </span>
                      </td>

                      {/* Payment ID */}
                      <td className="py-3 px-4">
                        {b.paymentId ? (
                          <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {b.paymentId}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4">
                        {b.status === "booked" && (
                          <button onClick={() => setCancelId(b._id)}
                            className="text-xs text-red-400 hover:text-red-600 font-semibold border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition whitespace-nowrap">
                            Cancel
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* FOOTER */}
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
              <span>Showing {filtered.length} of {bookings.length} bookings</span>
              <span className="font-semibold text-gray-500">
                💰 Total Revenue: ₹{bookings
                  .filter((b) => b.paymentStatus === "paid")
                  .reduce((sum, b) => sum + (b.totalPrice || 0), 0)
                  .toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBookings;