import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data.data || []);
    } catch {
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async (userId) => {
    setBookingsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/bookings`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setUserBookings(data.data || []);
    } catch {
      alert("Error fetching user bookings");
    } finally {
      setBookingsLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading users...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* USER BOOKINGS MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="font-black text-gray-900">{selectedUser.name}'s Bookings</h3>
                <p className="text-xs text-gray-400">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => { setSelectedUser(null); setUserBookings([]); }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5">
              {bookingsLoading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : userBookings.length === 0 ? (
                <p className="text-center text-gray-400 py-10">No bookings found</p>
              ) : (
                <div className="space-y-3">
                  {userBookings.map((b) => (
                    <div
                      key={b._id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800 text-sm">
                          {b.turf?.name || "—"}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                          b.status === "booked"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-500 border-red-200"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        📅 {b.date} • ⏰ {b.startTime}–{b.endTime}
                      </p>
                      <p className="text-xs text-green-700 font-semibold mt-1">
                        ₹{b.totalPrice}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">👥 All Users</h1>
            <p className="text-gray-400 text-sm mt-1">
              {users.length} registered users
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-green-500 transition"
          />
        </div>

        {/* TABLE */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">👤</p>
            <p className="text-gray-400 font-semibold">No users found</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["User", "Email", "Role", "Joined", "Bookings"].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u._id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-black text-green-700 flex-shrink-0">
                          {u.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <p className="font-semibold text-gray-800">{u.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                        u.role === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          fetchUserBookings(u._id);
                        }}
                        className="text-xs text-green-600 hover:text-green-800 font-semibold border border-green-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition"
                      >
                        View Bookings
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {users.length} users
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUsers;