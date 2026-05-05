import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setMessage("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      setMessage("");
      const res = await login(form);
      if (res.success) {
        localStorage.setItem("token", res.token);
        setTimeout(() => {
          if (res.user.role === "admin") navigate("/admin");
          else navigate("/turfs");
        }, 500);
      } else {
        setMessage(res.message || "Login failed");
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
    <div className="min-h-screen flex" style={{ backgroundColor: "#ffffff" }}>

      {/* LEFT — IMAGE SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1431324155629-1a6dae1434d5?w=1200&q=80"
          alt="turf"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.9))" }} />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <p className="text-emerald-600 text-xs tracking-[0.4em] uppercase mb-3 font-bold">Train • Play • Repeat</p>
          <h2 className="text-5xl font-black text-emerald-900 uppercase leading-tight">
            Welcome<br />Back
          </h2>
          <p className="text-emerald-700 mt-3 text-sm max-w-xs">
            Book your favourite turf and get back on the field where you belong.
          </p>
        </div>
      </div>

      {/* RIGHT — FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-10">
            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wider">
              Turf<span className="text-emerald-600">Arena</span>
            </h1>
            <p className="text-emerald-600 text-sm mt-1 font-medium">Sign in to your account</p>
          </div>

          {/* ERROR MESSAGE */}
          {message && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-700 text-sm font-medium">{message}</p>
            </div>
          )}

          {/* FORM */}
          <div className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="text-emerald-900 text-xs uppercase tracking-widest block mb-2 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-4 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 border bg-white"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#d1d5db",
                }}
                onFocus={(e) => e.target.style.borderColor = "#059669"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-emerald-900 text-xs uppercase tracking-widest block mb-2 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-4 rounded-lg text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 border pr-12 bg-white"
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#d1d5db",
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#059669"}
                  onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition text-sm font-medium"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 font-black text-white uppercase tracking-widest transition-all duration-200 rounded-lg mt-6 disabled:opacity-50 hover:opacity-90 bg-emerald-600 hover:bg-emerald-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In →"
              )}
            </button>

          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
            <span className="text-gray-500 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#d1d5db" }} />
          </div>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-bold hover:text-emerald-700 transition"
            >
              Create Account →
            </Link>
          </p>

          {/* BACK TO HOME */}
          <p className="text-center mt-4">
            <Link
              to="/"
              className="text-gray-600 text-xs hover:text-emerald-600 transition uppercase tracking-widest font-medium"
            >
              ← Back to Home
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
