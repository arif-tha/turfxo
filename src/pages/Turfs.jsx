import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Turfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMap, setExpandedMap] = useState(null); // ✅ Konsa map open hai

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await fetch("https://turfxo-backend-2.onrender.com/api/turfs");
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
        setTurfs(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  // ✅ Google Maps embed URL — address se generate
  const getMapUrl = (turf) => {
    const query = encodeURIComponent(
      `${turf.name} ${turf.location?.address || ""} ${turf.location?.city || "Kolkata"}`
    );
    return `https://maps.google.com/maps?q=${query}&output=embed&z=15`;
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="w-16 h-16 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-yellow-400 text-sm tracking-widest uppercase">Loading Turfs...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="text-center">
          <p className="text-6xl mb-4">⚠️</p>
          <p className="text-white font-bold text-xl mb-6">{error}</p>
          <button onClick={() => window.location.reload()}
            className="bg-yellow-400 text-black px-8 py-3 font-black uppercase tracking-wider hover:bg-yellow-300 transition">
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>

      {/* HERO BANNER */}
      <div className="relative h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6dae1434d5?w=1600&q=80"
          alt="turf"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,1))" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-2">Premium Venues</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase">Our Turfs</h1>
        </div>
      </div>

      {/* TURFS */}
      <div className="max-w-5xl mx-auto px-6 pb-20 -mt-4">

        {turfs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🏟️</p>
            <p className="text-white font-bold text-xl">No turfs available</p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          {turfs.map((turf, index) => (
            <div key={turf._id} className="group relative overflow-hidden"
              style={{ borderBottom: "1px solid #1a1a1a" }}>

              {/* MAIN CARD */}
              <div className="flex flex-col md:flex-row gap-0 hover:bg-white/3 transition-all duration-500">

                {/* LEFT — IMAGE */}
                <div className="relative md:w-96 h-64 md:h-72 overflow-hidden flex-shrink-0">
                  <img
                    src={turf.images?.[0] || "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80"}
                    alt={turf.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, #0a0a0a)" }} />

                  {/* INDEX NUMBER */}
                  <div className="absolute top-4 left-4 text-white/10 font-black" style={{ fontSize: "80px", lineHeight: 1 }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* PRICE */}
                  <div className="absolute bottom-4 left-4 bg-yellow-400 text-black font-black px-4 py-1 text-sm uppercase tracking-wider">
                    ₹{turf.pricePerHour}/hr
                  </div>
                </div>

                {/* RIGHT — DETAILS */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    {/* NAME */}
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                      {turf.name}
                    </h2>

                    <div className="w-12 h-0.5 bg-yellow-400 mb-6" />

                    {/* INFO */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-400/10 rounded flex items-center justify-center text-sm">📍</span>
                        <span className="text-gray-400 text-sm">
                          {turf.location?.address ? `${turf.location.address}, ` : ""}
                          {turf.location?.city || "Kolkata"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-400/10 rounded flex items-center justify-center text-sm">🕐</span>
                        <span className="text-gray-400 text-sm">
                          {turf.openTime || "06:00"} — {turf.closeTime || "03:00"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-yellow-400/10 rounded flex items-center justify-center text-sm">🔥</span>
                        <span className="text-yellow-400 text-sm font-semibold">100+ teams booked recently</span>
                      </div>
                    </div>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["⚽ Football", "💡 Floodlit", "🅿️ Parking", "🚿 Changing Room"].map((tag) => (
                        <span key={tag} className="text-xs text-gray-500 border border-gray-800 px-3 py-1 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <button
                      onClick={() => navigate(`/slots/${turf._id}`)}
                      className="bg-yellow-400 text-black font-black px-10 py-4 uppercase tracking-widest text-sm hover:bg-yellow-300 transition-all duration-200 hover:scale-105">
                      Book Now →
                    </button>

                    {/* ✅ View Map button */}
                    <button
                      onClick={() => setExpandedMap(expandedMap === turf._id ? null : turf._id)}
                      className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-5 py-4 border transition-all duration-200"
                      style={{
                        borderColor: expandedMap === turf._id ? "#facc15" : "#2a2a2a",
                        color: expandedMap === turf._id ? "#facc15" : "#666",
                      }}>
                      🗺️ {expandedMap === turf._id ? "Hide Map" : "View Map"}
                    </button>

                    <span className="text-gray-700 text-xs uppercase tracking-widest">
                      Instant Confirmation
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ GOOGLE MAP EMBED — toggle hota hai */}
              {expandedMap === turf._id && (
                <div className="w-full overflow-hidden transition-all duration-500"
                  style={{ borderTop: "1px solid #1a1a1a" }}>

                  {/* Map header */}
                  <div className="flex items-center justify-between px-8 py-3"
                    style={{ backgroundColor: "#111" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 text-sm">📍</span>
                      <span className="text-gray-400 text-sm">
                        {turf.name} — {turf.location?.address}, {turf.location?.city}
                      </span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(`${turf.name} ${turf.location?.address} ${turf.location?.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-yellow-400 hover:text-yellow-300 font-bold uppercase tracking-wider transition">
                      Open in Google Maps ↗
                    </a>
                  </div>

                  {/* Embedded Map */}
                  <div className="w-full h-72 md:h-96">
                    <iframe
                      title={`Map - ${turf.name}`}
                      src={getMapUrl(turf)}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} // ✅ Dark mode map
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Turfs;