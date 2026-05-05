import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await register(form);
      if (res.success) {
        navigate("/turfs");
      } else {
        setMessage(res.message || "Registration failed");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0a0a0a" }}>

      {/* LEFT — FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-20">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">
              Turf<span className="text-yellow-400">Arena</span>
            </h1>
            <p className="text-gray-600 text-sm mt-1">Create your account — it's free</p>
          </div>

          {/* ERROR MESSAGE */}
          {message && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm">{message}</p>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-4">

            {/* NAME */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-600 outline-none transition-all duration-200 border"
                style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
                onFocus={(e) => e.target.style.borderColor = "#facc15"}
                onBlur={(e) => e.target.style.borderColor = "#2a2a2a"}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-600 outline-none transition-all duration-200 border"
                style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
                onFocus={(e) => e.target.style.borderColor = "#facc15"}
                onBlur={(e) => e.target.style.borderColor = "#2a2a2a"}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-4 rounded-lg text-white placeholder-gray-600 outline-none transition-all duration-200 border pr-12"
                  style={{ backgroundColor: "#141414", borderColor: "#2a2a2a" }}
                  onFocus={(e) => e.target.style.borderColor = "#facc15"}
                  onBlur={(e) => e.target.style.borderColor = "#2a2a2a"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* PASSWORD STRENGTH */}
              {form.password.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          form.password.length >= level * 4
                            ? level === 1 ? "#ef4444"
                              : level === 2 ? "#facc15"
                              : "#22c55e"
                            : "#1a1a1a"
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 font-black text-black uppercase tracking-widest transition-all duration-200 rounded-lg mt-2 disabled:opacity-50 hover:opacity-90"
              style={{ backgroundColor: "#facc15" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account →"
              )}
            </button>

            {/* TERMS */}
            <p className="text-gray-700 text-xs text-center">
              By registering, you agree to our{" "}
              <span className="text-gray-500 cursor-pointer hover:text-gray-300 transition">
                Terms of Service
              </span>{" "}
              &{" "}
              <span className="text-gray-500 cursor-pointer hover:text-gray-300 transition">
                Privacy Policy
              </span>
            </p>

          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ backgroundColor: "#1a1a1a" }} />
            <span className="text-gray-600 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#1a1a1a" }} />
          </div>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-400 font-bold hover:text-yellow-300 transition"
            >
              Sign In →
            </Link>
          </p>

          {/* BACK TO HOME */}
          <p className="text-center mt-4">
            <Link
              to="/"
              className="text-gray-700 text-xs hover:text-gray-500 transition uppercase tracking-widest"
            >
              ← Back to Home
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT — IMAGE SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&q=80"
          alt="turf"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to left, transparent, #0a0a0a)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">
            Train • Play • Repeat
          </p>
          <h2 className="text-5xl font-black text-white uppercase leading-tight">
            Join The<br />Arena
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-xs">
            Join 1000+ players already booking their favourite turfs every week.
          </p>

          {/* STATS */}
          <div className="flex gap-8 mt-8">
            <div>
              <p className="text-yellow-400 font-black text-2xl">50+</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Turfs</p>
            </div>
            <div>
              <p className="text-yellow-400 font-black text-2xl">1000+</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Players</p>
            </div>
            <div>
              <p className="text-yellow-400 font-black text-2xl">4.8★</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Rating</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Register;
