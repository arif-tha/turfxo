import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://turfxo-backend-2.onrender.com/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch {
      console.error("Dashboard fetch error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const maxCount = stats?.weeklyData
    ? Math.max(...stats.weeklyData.map((d) => d.count), 1)
    : 1;

  const getDayLabel = (dateStr) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(dateStr).getDay()];
  };

  const isToday = (dateStr) =>
    dateStr === new Date().toISOString().split("T")[0];

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2h5v5H2zm7 0h5v5H9zm-7 7h5v5H2zm7 0h5v5H9z"/></svg> },
    { label: "Slots", path: "/admin/create-slots", icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zM3 8a5 5 0 1110 0A5 5 0 013 8zm5-3v3l2 2-1 1-2.5-2.5V5H8z"/></svg> },
    { label: "Bookings", path: "/admin/bookings", icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M1 3h14v2H1zm2 4h10v2H3zm2 4h6v2H5z"/></svg> },
    { label: "Turfs", path: "/admin/add-turf", icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1h10a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1zm1 2v10h8V3H4zm1 2h6v1H5zm0 3h6v1H5zm0 3h4v1H5z"/></svg> },
    { label: "Users", path: "/admin/users", icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/></svg> },
  ];

  // ── Reusable sidebar bottom buttons ──
  const SidebarBottom = () => (
    <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", flexDirection: "column", gap: "6px" }}>
      <button
        onClick={() => { navigate("/"); setSidebarOpen(false); }}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "10px",
          padding: "9px 12px", borderRadius: "8px",
          background: "transparent", border: "1px solid #e5e7eb",
          color: "#6b7280", cursor: "pointer", fontSize: "12px", fontWeight: 600
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#22C55E"; e.currentTarget.style.borderColor = "#DCFCE7"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.borderColor = "#e5e7eb"; }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5v-5h3v5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146z"/>
        </svg>
        Back to Site
      </button>
      <button
        onClick={handleLogout}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "10px",
          padding: "9px 12px", borderRadius: "8px",
          background: "#FEE2E2", border: "1px solid #FECACA",
          color: "#DC2626", cursor: "pointer", fontSize: "12px", fontWeight: 600
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#FECACA"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#FEE2E2"; }}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
        Logout
      </button>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-premium-bg">
        <div className="w-12 h-12 rounded-full border-2 border-gray-300 border-t-premium-accent animate-spin" />
        <p className="text-premium-accent text-sm font-semibold tracking-widest uppercase">Loading...</p>
      </div>
    );

  return (
    <div className="bg-premium-bg text-primary-text min-h-screen">

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.2)", zIndex: 40 }} />
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: "220px",
        background: "white", borderRight: "1px solid #e5e7eb",
        zIndex: 50, display: "flex", flexDirection: "column",
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 900, color: "#22C55E" }}>TurfAdmin</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Management Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)}
            style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 20px", color: "#d1d5db" }}>Navigation</p>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 20px", fontSize: "13px", textAlign: "left",
                  background: active ? "#DCFCE7" : "transparent",
                  borderLeft: active ? "2px solid #22C55E" : "2px solid transparent",
                  color: active ? "#22C55E" : "#6b7280",
                  border: "none", cursor: "pointer",
                }}>
                {item.icon}{item.label}
              </button>
            );
          })}
        </nav>

        {/* ✅ Bottom buttons — mobile drawer */}
        <SidebarBottom />
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col flex-shrink-0"
          style={{ width: "220px", background: "white", borderRight: "1px solid #e5e7eb" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "17px", fontWeight: 900, color: "#22C55E" }}>TurfAdmin</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>Management Panel</div>
          </div>
          <nav style={{ flex: 1, padding: "12px 0" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 20px 4px", color: "#d1d5db" }}>Main</p>
            {navItems.slice(0, 2).map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] text-left transition-all"
                  style={{
                    background: active ? "#DCFCE7" : "transparent",
                    borderLeft: active ? "2px solid #22C55E" : "2px solid transparent",
                    color: active ? "#22C55E" : "#6b7280",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#F0FDF4"; e.currentTarget.style.color = "#22C55E"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b7280"; }}}>
                  {item.icon}{item.label}
                </button>
              );
            })}
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 20px 4px", color: "#d1d5db" }}>Manage</p>
            {navItems.slice(2).map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] text-left transition-all"
                  style={{
                    background: active ? "#DCFCE7" : "transparent",
                    borderLeft: active ? "2px solid #22C55E" : "2px solid transparent",
                    color: active ? "#22C55E" : "#6b7280",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#F0FDF4"; e.currentTarget.style.color = "#22C55E"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b7280"; }}}>
                  {item.icon}{item.label}
                </button>
              );
            })}
          </nav>

          {/* ✅ Bottom buttons — desktop sidebar */}
          <SidebarBottom />
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* Topbar */}
          <header style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "white", flexShrink: 0
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}
                style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "6px 8px", color: "#22C55E", cursor: "pointer", display: "flex" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.5A.5.5 0 0 1 1.5 2h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2.5zm0 4A.5.5 0 0 1 1.5 6h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 6.5zm0 4A.5.5 0 0 1 1.5 10h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 10.5z"/>
                </svg>
              </button>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Dashboard</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "20px", background: "white", color: "#22C55E", border: "1px solid #DCFCE7", fontWeight: 700 }}>● Live</span>
              <button onClick={fetchStats}
                style={{ fontSize: "12px", padding: "5px 10px", borderRadius: "8px", background: "white", color: "#22C55E", border: "1px solid #e5e7eb", cursor: "pointer", fontWeight: 700 }}>↻</button>
              {/* ✅ Home + Logout in topbar for mobile */}
              <button onClick={() => navigate("/")}
                className="lg:hidden"
                style={{ fontSize: "11px", padding: "5px 10px", borderRadius: "8px", background: "white", color: "#6b7280", border: "1px solid #e5e7eb", cursor: "pointer", fontWeight: 600 }}>
                🏠
              </button>
              <button onClick={handleLogout}
                className="lg:hidden"
                style={{ fontSize: "11px", padding: "5px 10px", borderRadius: "8px", background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA", cursor: "pointer", fontWeight: 600 }}>
                Exit
              </button>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#DCFCE7", border: "1px solid #BFDBFE", color: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>
                A
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

              {/* STAT CARDS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "16px" }}>
                {[
                  { label: "Total Turfs", value: stats?.totalTurfs ?? 0, sub: "Active venues", accent: "#22C55E", icon: "🏟️" },
                  { label: "Total Bookings", value: stats?.totalBookings ?? 0, sub: "All time", accent: "#16A34A", icon: "📦" },
                  { label: "Total Users", value: stats?.totalUsers ?? 0, sub: "Registered", accent: "#10B981", icon: "👥" },
                  { label: "Today's Bookings", value: stats?.todayBookings ?? 0, sub: `₹${(stats?.totalRevenue ?? 0).toLocaleString("en-IN")} revenue`, accent: "#34D399", icon: "📅" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "white", border: "1px solid #e5e7eb", borderTop: `2px solid ${s.accent}`, borderRadius: "12px", padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 600, color: "#6b7280", lineHeight: 1.3 }}>{s.label}</p>
                      <span style={{ fontSize: "16px" }}>{s.icon}</span>
                    </div>
                    <p style={{ fontSize: "26px", fontWeight: 900, color: "#111827", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: s.accent, marginTop: "8px" }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* CHART */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Bookings this week</p>
                  <button onClick={() => navigate("/admin/bookings")}
                    style={{ fontSize: "11px", color: "#22C55E", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all</button>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "90px" }}>
                  {stats?.weeklyData?.map((d, i) => {
                    const today = isToday(d.date);
                    const h = Math.max(Math.round((d.count / maxCount) * 74), d.count > 0 ? 8 : 2);
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 700, color: today ? "#22C55E" : "#d1d5db" }}>{d.count}</span>
                        <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: `${h}px`, background: today ? "#22C55E" : "#E5E7EB", boxShadow: today ? "0 0 10px #22C55E40" : "none", transition: "all 0.3s" }} />
                        <span style={{ fontSize: "9px", fontWeight: 600, color: today ? "#22C55E" : "#d1d5db" }}>{getDayLabel(d.date)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RECENT BOOKINGS */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Recent bookings</p>
                  <button onClick={() => navigate("/admin/bookings")}
                    style={{ fontSize: "11px", color: "#22C55E", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>See more</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {!stats?.recentBookings?.length ? (
                    <p style={{ textAlign: "center", padding: "24px 0", fontSize: "13px", color: "#d1d5db" }}>No bookings yet</p>
                  ) : stats.recentBookings.map((b) => (
                    <div key={b._id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "#F9FAFB", border: "1px solid #e5e7eb" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, background: b.status === "booked" ? "#22C55E" : "#EF4444" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "#22C55E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.user?.name || "User"}</p>
                        <p style={{ fontSize: "10px", color: "#6b7280", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.turf?.name} · {b.date} · {b.startTime}–{b.endTime}</p>
                      </div>
                      <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontWeight: 700, flexShrink: 0, ...(b.status === "booked" ? { background: "#DCFCE7", color: "#16A34A", border: "1px solid #BFDBFE" } : { background: "#FEE2E2", color: "#DC2626", border: "1px solid #FECACA" }) }}>
                        {b.status === "booked" ? "Booked" : "Cancelled"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "16px", marginBottom: "80px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", marginBottom: "12px" }}>Quick actions</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {[
                    { icon: "➕", label: "Add Turf", path: "/admin/add-turf", bg: "#F0FDF4" },
                    { icon: "⚙️", label: "Slot Config", path: "/admin/create-slots", bg: "#FFFBEB" },
                    { icon: "📦", label: "Bookings", path: "/admin/bookings", bg: "#EFF6FF" },
                    { icon: "👥", label: "Users", path: "/admin/users", bg: "#FAF5FF" },
                  ].map((a) => (
                    <button key={a.path} onClick={() => navigate(a.path)}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "10px", textAlign: "left", background: a.bg, border: "1px solid #e5e7eb", color: "#6b7280", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#22C55E"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
                        {a.icon}
                      </span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── BOTTOM NAV — mobile only ── */}
          <div className="lg:hidden" style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "white", borderTop: "1px solid #e5e7eb",
            display: "flex", zIndex: 30
          }}>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "8px 4px", gap: "3px",
                    fontSize: "9px", fontWeight: 700,
                    color: active ? "#22C55E" : "#d1d5db",
                    background: "none", border: "none", cursor: "pointer"
                  }}>
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
