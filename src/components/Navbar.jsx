import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-emerald-600 font-semibold"
      : "text-gray-600 hover:text-emerald-600 transition-colors duration-200";

  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-3"
          : "bg-gradient-to-b from-white/95 to-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">T</span>
          </div>
          <h1 className="text-xl font-black tracking-wide text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
            Turf<span className="text-emerald-600">Arena</span>
          </h1>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/turfs" className={isActive("/turfs")}>Turfs</Link>

          {/* ADMIN LINKS */}
          {token && user?.role === "admin" && (
            <>
              <Link to="/admin" className={isActive("/admin")}>Dashboard</Link>
              <Link to="/admin/add-turf" className={isActive("/admin/add-turf")}>Add Turf</Link>
              <Link to="/admin/bookings" className={isActive("/admin/bookings")}>All Bookings</Link>
            </>
          )}

          {/* AUTH */}
          {!token ? (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-5 py-2 rounded-full font-bold hover:bg-emerald-700 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">

              {/* MY BOOKINGS LINK */}
              <Link to="/my-bookings" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm">
                My Bookings
              </Link>

              {/* USER BADGE — click pe profile */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:border-emerald-600/50 transition-all duration-200"
                style={{ backgroundColor: "rgba(5, 150, 105, 0.05)", borderColor: "rgba(5, 150, 105, 0.2)" }}
              >
                <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{firstLetter}</span>
                </div>
                <span className="text-gray-900 text-sm font-medium">
                  {user?.name || "User"}
                </span>
                {user?.role === "admin" && (
                  <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    Admin
                  </span>
                )}
                {/* Profile icon */}
                <span className="text-gray-400 text-xs">▾</span>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border border-red-500/20 hover:border-red-500"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-900 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white px-6 py-4 flex flex-col gap-4 text-sm border-t border-gray-200 shadow-lg">

          <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/turfs" className={isActive("/turfs")} onClick={() => setMenuOpen(false)}>Turfs</Link>

          {/* ADMIN LINKS MOBILE */}
          {token && user?.role === "admin" && (
            <>
              <Link to="/admin" className={isActive("/admin")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/admin/add-turf" className={isActive("/admin/add-turf")} onClick={() => setMenuOpen(false)}>Add Turf</Link>
              <Link to="/admin/bookings" className={isActive("/admin/bookings")} onClick={() => setMenuOpen(false)}>All Bookings</Link>
            </>
          )}

          {!token ? (
            <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
              <Link to="/login" className="text-gray-600 hover:text-emerald-600" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-5 py-2 rounded-full font-bold text-center hover:bg-emerald-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">

              {/* MY BOOKINGS MOBILE */}
              <Link to="/my-bookings" className="text-gray-600 hover:text-emerald-600 text-sm" onClick={() => setMenuOpen(false)}>My Bookings</Link>

              {/* USER — click pe profile */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => { navigate("/profile"); setMenuOpen(false); }}
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{firstLetter}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-sm">{user?.name || "User"}</p>
                  <p className="text-gray-500 text-xs">View Profile →</p>
                </div>
                {user?.role === "admin" && (
                  <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-auto">Admin</span>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition text-center"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
