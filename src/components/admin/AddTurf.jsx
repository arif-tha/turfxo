import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTurf() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    pricePerHour: "",
    sportsType: "football",
    openTime: "06:00",
    closeTime: "22:00",
    slotDuration: 60,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.city || !form.address || !form.pricePerHour) {
      setMessage({ text: "All fields are required", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/turfs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          location: { city: form.city, address: form.address },
          pricePerHour: Number(form.pricePerHour),
          sportsType: form.sportsType,
          openTime: form.openTime,
          closeTime: form.closeTime,
          slotDuration: Number(form.slotDuration),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Turf added successfully!", type: "success" });
        setForm({
          name: "", city: "", address: "", pricePerHour: "",
          sportsType: "football", openTime: "06:00",
          closeTime: "22:00", slotDuration: 60,
        });
      } else {
        setMessage({ text: data.message, type: "error" });
      }
    } catch {
      setMessage({ text: "Error adding turf", type: "error" });
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-lg font-black text-gray-900 mb-2">Confirm Add Turf</h3>
            <p className="text-gray-500 text-sm mb-1">🏟️ {form.name}</p>
            <p className="text-gray-500 text-sm mb-1">📍 {form.address}, {form.city}</p>
            <p className="text-gray-500 text-sm mb-4">💰 ₹{form.pricePerHour}/hr</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-500 text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-2 bg-green-700 text-white rounded-lg text-sm font-bold hover:bg-green-800 transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">➕ Add New Turf</h1>
            <p className="text-gray-400 text-sm mt-1">Fill details to list a new turf</p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">

          {/* BASIC INFO */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Basic Info
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Turf Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Green Valley FC"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Kolkata"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Salt Lake Sector 5"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PRICING & SPORT */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Pricing & Sport
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price per Hour (₹) *
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  placeholder="e.g. 800"
                  value={form.pricePerHour}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sports Type</label>
                <select
                  name="sportsType"
                  value={form.sportsType}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                >
                  <option value="football">Football</option>
                  <option value="cricket">Cricket</option>
                  <option value="badminton">Badminton</option>
                </select>
              </div>
            </div>
          </div>

          {/* SLOT CONFIG */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
              Slot Configuration
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Opening Time</label>
                <input
                  type="time"
                  name="openTime"
                  value={form.openTime}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Closing Time</label>
                <input
                  type="time"
                  name="closeTime"
                  value={form.closeTime}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slot Duration</label>
                <select
                  name="slotDuration"
                  value={form.slotDuration}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
                >
                  <option value={30}>30 min</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hrs</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          {message.text && (
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}>
              {message.type === "success" ? "✅" : "❌"} {message.text}
            </div>
          )}

          {/* SUBMIT */}
          <button
            onClick={() => {
              if (!form.name || !form.city || !form.address || !form.pricePerHour) {
                setMessage({ text: "All fields are required", type: "error" });
                return;
              }
              setMessage({ text: "", type: "" });
              setShowConfirm(true);
            }}
            className="w-full py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition"
          >
            ➕ Add Turf
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTurf;