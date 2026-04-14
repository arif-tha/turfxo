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
      const res = await fetch("http://localhost:5000/api/admin/dashboard", {
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
    <div style={{ padding: "12px 16px", borderTop: "1px solid #0f1e38", display: "flex", flexDirection: "column", gap: "6px" }}>
      <button
        onClick={() => { navigate("/"); setSidebarOpen(false); }}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: "10px",
          padding: "9px 12px", borderRadius: "8px",
          background: "transparent", border: "1px solid #0f1e38",
          color: "#4a7aaa", cursor: "pointer", fontSize: "12px", fontWeight: 600
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#93c5fd"; e.currentTarget.style.borderColor = "#1a3a6a"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#4a7aaa"; e.currentTarget.style.borderColor = "#0f1e38"; }}
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
          background: "#1a0a0a", border: "1px solid #3a1a1a",
          color: "#f87171", cursor: "pointer", fontSize: "12px", fontWeight: 600
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#2a1010"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#1a0a0a"; }}
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#070b12" }}>
        <div className="w-12 h-12 rounded-full border-2 border-[#1a2a4a] border-t-[#3b82f6] animate-spin" />
        <p className="text-[#3b82f6] text-sm font-semibold tracking-widest uppercase">Loading...</p>
      </div>
    );

  return (
    <div style={{ background: "#070b12", color: "#e0eeff", minHeight: "100vh" }}>

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 40 }} />
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <div style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: "220px",
        background: "#090e18", borderRight: "1px solid #0f1e38",
        zIndex: 50, display: "flex", flexDirection: "column",
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px", borderBottom: "1px solid #0f1e38", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "17px", fontWeight: 900, color: "#3b82f6" }}>TurfAdmin</div>
            <div style={{ fontSize: "11px", color: "#1e3a5a", marginTop: "2px" }}>Management Panel</div>
          </div>
          <button onClick={() => setSidebarOpen(false)}
            style={{ color: "#1e3a5a", background: "none", border: "none", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854z"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 20px", color: "#1e3a5a" }}>Navigation</p>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button key={item.path}
                onClick={() => { navigate(item.path); setSidebarOpen(false); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 20px", fontSize: "13px", textAlign: "left",
                  background: active ? "#0f1e38" : "transparent",
                  borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                  color: active ? "#3b82f6" : "#4a7aaa",
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
          style={{ width: "220px", background: "#090e18", borderRight: "1px solid #0f1e38" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid #0f1e38" }}>
            <div style={{ fontSize: "17px", fontWeight: 900, color: "#3b82f6" }}>TurfAdmin</div>
            <div style={{ fontSize: "11px", color: "#1e3a5a", marginTop: "2px" }}>Management Panel</div>
          </div>
          <nav style={{ flex: 1, padding: "12px 0" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "8px 20px 4px", color: "#1e3a5a" }}>Main</p>
            {navItems.slice(0, 2).map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] text-left transition-all"
                  style={{
                    background: active ? "#0f1e38" : "transparent",
                    borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                    color: active ? "#3b82f6" : "#4a7aaa",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#0f1e38"; e.currentTarget.style.color = "#93c5fd"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4a7aaa"; }}}>
                  {item.icon}{item.label}
                </button>
              );
            })}
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "12px 20px 4px", color: "#1e3a5a" }}>Manage</p>
            {navItems.slice(2).map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2.5 px-5 py-2.5 text-[13px] text-left transition-all"
                  style={{
                    background: active ? "#0f1e38" : "transparent",
                    borderLeft: active ? "2px solid #3b82f6" : "2px solid transparent",
                    color: active ? "#3b82f6" : "#4a7aaa",
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#0f1e38"; e.currentTarget.style.color = "#93c5fd"; }}}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4a7aaa"; }}}>
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
            padding: "12px 16px", borderBottom: "1px solid #0f1e38", background: "#070b12", flexShrink: 0
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}
                style={{ background: "#0f1e38", border: "1px solid #1a3a6a", borderRadius: "8px", padding: "6px 8px", color: "#3b82f6", cursor: "pointer", display: "flex" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 2.5A.5.5 0 0 1 1.5 2h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2.5zm0 4A.5.5 0 0 1 1.5 6h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 6.5zm0 4A.5.5 0 0 1 1.5 10h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 10.5z"/>
                </svg>
              </button>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#c0d8f8" }}>Dashboard</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "20px", background: "#0f1e38", color: "#3b82f6", border: "1px solid #1a3a6a", fontWeight: 700 }}>● Live</span>
              <button onClick={fetchStats}
                style={{ fontSize: "12px", padding: "5px 10px", borderRadius: "8px", background: "#0f1e38", color: "#3b82f6", border: "1px solid #1a3a6a", cursor: "pointer", fontWeight: 700 }}>↻</button>
              {/* ✅ Home + Logout in topbar for mobile */}
              <button onClick={() => navigate("/")}
                className="lg:hidden"
                style={{ fontSize: "11px", padding: "5px 10px", borderRadius: "8px", background: "#0f1e38", color: "#4a7aaa", border: "1px solid #1a3a6a", cursor: "pointer", fontWeight: 600 }}>
                🏠
              </button>
              <button onClick={handleLogout}
                className="lg:hidden"
                style={{ fontSize: "11px", padding: "5px 10px", borderRadius: "8px", background: "#1a0a0a", color: "#f87171", border: "1px solid #3a1a1a", cursor: "pointer", fontWeight: 600 }}>
                Exit
              </button>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#0f1e38", border: "1px solid #1a3a6a", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900 }}>
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
                  { label: "Total Turfs", value: stats?.totalTurfs ?? 0, sub: "Active venues", accent: "#3b82f6", icon: "🏟️" },
                  { label: "Total Bookings", value: stats?.totalBookings ?? 0, sub: "All time", accent: "#60a5fa", icon: "📦" },
                  { label: "Total Users", value: stats?.totalUsers ?? 0, sub: "Registered", accent: "#fbbf24", icon: "👥" },
                  { label: "Today's Bookings", value: stats?.todayBookings ?? 0, sub: `₹${(stats?.totalRevenue ?? 0).toLocaleString("en-IN")} revenue`, accent: "#a78bfa", icon: "📅" },
                ].map((s) => (
                  <div key={s.label} style={{ background: "#090e18", border: "1px solid #0f1e38", borderTop: `2px solid ${s.accent}`, borderRadius: "12px", padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 600, color: "#2a4a7a", lineHeight: 1.3 }}>{s.label}</p>
                      <span style={{ fontSize: "16px" }}>{s.icon}</span>
                    </div>
                    <p style={{ fontSize: "26px", fontWeight: 900, color: "#e0eeff", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ fontSize: "10px", fontWeight: 600, color: s.accent, marginTop: "8px" }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* CHART */}
              <div style={{ background: "#090e18", border: "1px solid #0f1e38", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#c0d8f8" }}>Bookings this week</p>
                  <button onClick={() => navigate("/admin/bookings")}
                    style={{ fontSize: "11px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all</button>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "90px" }}>
                  {stats?.weeklyData?.map((d, i) => {
                    const today = isToday(d.date);
                    const h = Math.max(Math.round((d.count / maxCount) * 74), d.count > 0 ? 8 : 2);
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <span style={{ fontSize: "9px", fontWeight: 700, color: today ? "#3b82f6" : "#1e3a5a" }}>{d.count}</span>
                        <div style={{ width: "100%", borderRadius: "3px 3px 0 0", height: `${h}px`, background: today ? "#3b82f6" : "#0f1e38", boxShadow: today ? "0 0 10px #3b82f640" : "none", transition: "all 0.3s" }} />
                        <span style={{ fontSize: "9px", fontWeight: 600, color: today ? "#3b82f6" : "#1e3a5a" }}>{getDayLabel(d.date)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RECENT BOOKINGS */}
              <div style={{ background: "#090e18", border: "1px solid #0f1e38", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#c0d8f8" }}>Recent bookings</p>
                  <button onClick={() => navigate("/admin/bookings")}
                    style={{ fontSize: "11px", color: "#3b82f6", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>See more</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {!stats?.recentBookings?.length ? (
                    <p style={{ textAlign: "center", padding: "24px 0", fontSize: "13px", color: "#1e3a5a" }}>No bookings yet</p>
                  ) : stats.recentBookings.map((b) => (
                    <div key={b._id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", background: "#0a1020", border: "1px solid #0f1e38" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, background: b.status === "booked" ? "#3b82f6" : "#f87171" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: "#a0c4f8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.user?.name || "User"}</p>
                        <p style={{ fontSize: "10px", color: "#1e3a5a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.turf?.name} · {b.date} · {b.startTime}–{b.endTime}</p>
                      </div>
                      <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", fontWeight: 700, flexShrink: 0, ...(b.status === "booked" ? { background: "#0f1e38", color: "#3b82f6", border: "1px solid #1a3a6a" } : { background: "#2a0f0f", color: "#f87171", border: "1px solid #4a1a1a" }) }}>
                        {b.status === "booked" ? "Booked" : "Cancelled"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div style={{ background: "#090e18", border: "1px solid #0f1e38", borderRadius: "12px", padding: "16px", marginBottom: "80px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#c0d8f8", marginBottom: "12px" }}>Quick actions</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {[
                    { icon: "➕", label: "Add Turf", path: "/admin/add-turf", bg: "#0f1e38" },
                    { icon: "⚙️", label: "Slot Config", path: "/admin/create-slots", bg: "#0f1a2a" },
                    { icon: "📦", label: "Bookings", path: "/admin/bookings", bg: "#1a1a0f" },
                    { icon: "👥", label: "Users", path: "/admin/users", bg: "#1a0f2a" },
                  ].map((a) => (
                    <button key={a.path} onClick={() => navigate(a.path)}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "10px", textAlign: "left", background: a.bg, border: "1px solid #0f1e38", color: "#4a7aaa", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#93c5fd"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#4a7aaa"; }}>
                      <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#070b12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>
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
            background: "#090e18", borderTop: "1px solid #0f1e38",
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
                    color: active ? "#3b82f6" : "#1e3a5a",
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