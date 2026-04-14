import { useEffect, useState } from "react";

function CreateSlots() {
  const [turfs, setTurfs] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [form, setForm] = useState({
    turf: "",
    openTime: "06:00",
    closeTime: "22:00",
    slotDuration: 60,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [saving, setSaving] = useState(false);
  const [previewSlots, setPreviewSlots] = useState([]);

  const token = localStorage.getItem("token");

  // 📥 Turfs fetch
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/turfs");
        const data = await res.json();
        setTurfs(data.data || []);
      } catch {
        setMessage({ text: "❌ Failed to load turfs", type: "error" });
      }
    };
    fetchTurfs();
  }, []);

  // ✅ Turf select hone pe existing config load karo
  const handleTurfChange = (e) => {
    const turfId = e.target.value;
    const turf = turfs.find((t) => t._id === turfId);
    setSelectedTurf(turf);
    setForm({
      turf: turfId,
      openTime: turf?.openTime || "06:00",
      closeTime: turf?.closeTime || "22:00",
      slotDuration: turf?.slotDuration || 60,
    });
  };

  // 🔁 Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👁️ Preview slots generate karo (frontend pe)
  useEffect(() => {
    if (!form.openTime || !form.closeTime || !form.slotDuration) return;
    const slots = [];
    const [openH, openM] = form.openTime.split(":").map(Number);
    const [closeH, closeM] = form.closeTime.split(":").map(Number);
    let current = openH * 60 + openM;
    const end = closeH * 60 + closeM;
    const dur = parseInt(form.slotDuration);
    while (current + dur <= end) {
      const sH = String(Math.floor(current / 60)).padStart(2, "0");
      const sM = String(current % 60).padStart(2, "0");
      const eMin = current + dur;
      const eH = String(Math.floor(eMin / 60)).padStart(2, "0");
      const eM = String(eMin % 60).padStart(2, "0");
      slots.push(`${sH}:${sM} — ${eH}:${eM}`);
      current += dur;
    }
    setPreviewSlots(slots);
  }, [form.openTime, form.closeTime, form.slotDuration]);

  // 🚀 Save turf config
  const handleSave = async () => {
    if (!form.turf) {
      setMessage({ text: "❌ Please select a turf", type: "error" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/turfs/${form.turf}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            openTime: form.openTime,
            closeTime: form.closeTime,
            slotDuration: parseInt(form.slotDuration),
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "✅ Slot config saved! Slots will auto-generate.", type: "success" });
      } else {
        setMessage({ text: `❌ ${data.message}`, type: "error" });
      }
    } catch {
      setMessage({ text: "❌ Error saving config", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">⚙️ Slot Configuration</h1>
          <p className="text-gray-400 text-sm mt-1">
            Set turf timing — slots will auto-generate for users
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">

          {/* TURF SELECT */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Select Turf
            </label>
            <select
              name="turf"
              value={form.turf}
              onChange={handleTurfChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
            >
              <option value="">— Choose a turf —</option>
              {turfs.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            {/* OPEN TIME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Opening Time
              </label>
              <input
                type="time"
                name="openTime"
                value={form.openTime}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
              />
            </div>

            {/* CLOSE TIME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Closing Time
              </label>
              <input
                type="time"
                name="closeTime"
                value={form.closeTime}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
              />
            </div>
          </div>

          {/* SLOT DURATION */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Slot Duration
            </label>
            <select
              name="slotDuration"
              value={form.slotDuration}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none focus:border-green-500 transition"
            >
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "💾 Save Slot Config"}
          </button>

          {/* MESSAGE */}
          {message.text && (
            <p className={`text-center mt-3 text-sm font-semibold ${
              message.type === "success" ? "text-green-600" : "text-red-500"
            }`}>
              {message.text}
            </p>
          )}
        </div>

        {/* PREVIEW */}
        {previewSlots.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-black text-gray-700 mb-4">
              👁️ Preview — {previewSlots.length} slots will be generated daily
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {previewSlots.map((s, i) => (
                <div
                  key={i}
                  className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 text-xs font-semibold text-green-700 text-center"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSlots;