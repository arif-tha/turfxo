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

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!cancelId) return;
    try {
      const res = await fetch(
        `https://turfxo-backend-2.onrender.com/api/bookings/cancel/${cancelId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
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
    const matchPayment =
      filterPayment === "all" || b.paymentStatus === filterPayment;
    const matchDate = !filterDate || b.date === filterDate;
    const matchSearch =
      !search ||
      b.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.turf?.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.playerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.playerPhone?.includes(search);

    return matchStatus && matchPayment && matchDate && matchSearch;
  });

  const stats = {
    total: bookings.length,
    booked: bookings.filter((b) => b.status === "booked").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    paid: bookings.filter((b) => b.paymentStatus === "paid").length,
  };

  const revenue = bookings
    .filter((b) => b.paymentStatus === "paid")
    .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  const statusStyles = {
    booked: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
    completed: "bg-blue-100 text-blue-600",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* CANCEL MODAL */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="font-bold text-lg mb-2">Cancel Booking?</h3>
            <p className="text-sm text-gray-500 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 border rounded-lg py-2 text-sm"
              >
                Keep
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-red-500 text-white rounded-lg py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black">📦 Bookings</h1>
            <p className="text-sm text-gray-400">Manage all bookings</p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Dashboard
          </button>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-600 text-white p-4 rounded-xl">
            <p className="text-xs">Revenue</p>
            <p className="text-xl font-bold">₹{revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-400">Total</p>
            <p className="font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-400">Active</p>
            <p className="font-bold">{stats.booked}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border">
            <p className="text-xs text-gray-400">Cancelled</p>
            <p className="font-bold">{stats.cancelled}</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="bg-white rounded-xl border p-4 mb-6 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Payment</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* MOBILE CARDS */}
        <div className="lg:hidden space-y-4">
          {filtered.map((b) => (
            <div key={b._id} className="bg-white p-4 rounded-xl border">
              <div className="flex justify-between">
                <p className="font-bold">{b.turf?.name}</p>
                <span className="text-xs text-gray-400">{b.date}</span>
              </div>

              <p className="text-sm text-gray-500">
                {b.startTime} - {b.endTime}
              </p>

              <p className="text-sm mt-2">
                👤 {b.playerName || "N/A"}
                <br />
                📞 {b.playerPhone || "—"}
              </p>

              <div className="flex justify-between mt-3 items-center">
                <span className="font-bold text-green-600">
                  ₹{b.totalPrice}
                </span>

                {b.status === "booked" && (
                  <button
                    onClick={() => setCancelId(b._id)}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="hidden lg:block bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50">
                <tr>
                  {["User", "Turf", "Date", "Time", "Price", "Status", "Action"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((b) => (
                  <tr key={b._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold">{b.user?.name}</p>
                      <p className="text-xs text-gray-400">{b.user?.email}</p>
                    </td>

                    <td className="px-4 py-3">{b.turf?.name}</td>
                    <td className="px-4 py-3">{b.date}</td>
                    <td className="px-4 py-3">
                      {b.startTime} - {b.endTime}
                    </td>

                    <td className="px-4 py-3 font-bold">
                      ₹{b.totalPrice}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${statusStyles[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      {b.status === "booked" && (
                        <button
                          onClick={() => setCancelId(b._id)}
                          className="text-xs text-red-500 border px-3 py-1 rounded"
                        >
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
          <div className="px-4 py-2 text-xs text-gray-400 flex justify-between">
            <span>
              Showing {filtered.length} of {bookings.length}
            </span>
            <span>₹{revenue.toLocaleString()}</span>
          </div>
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl">📭</p>
            <p className="text-gray-500 mt-2">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBookings;