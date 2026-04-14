import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1600",
      title: "KOLKATA'S PREMIER",
      highlight: "TURF ARENA",
      tag: "Est. 2024 · Kolkata",
    },
    {
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1600",
      title: "BOOK YOUR",
      highlight: "PERFECT SLOT",
      tag: "Instant Confirmation",
    },
    {
      image: "https://images.unsplash.com/photo-1431324155629-1a6dae1434d5?w=1600",
      title: "PLAY LIKE",
      highlight: "A CHAMPION",
      tag: "World Class Facilities",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { number: "50+", label: "Premium Turfs" },
    { number: "1000+", label: "Happy Players" },
    { number: "5000+", label: "Bookings Done" },
    { number: "4.8★", label: "Avg Rating" },
  ];

  const steps = [
    { icon: "01", emoji: "🤝", title: "Create Account", desc: "Quick registration in under 60 seconds. No credit card required.", btn: "Register Free", action: "/register" },
    { icon: "02", emoji: "🏟️", title: "Pick Your Turf", desc: "Browse premium turfs near you with real-time availability.", btn: "View Turfs", action: "/turfs" },
    { icon: "03", emoji: "📅", title: "Book & Play", desc: "Instant confirmation. Show up and play — it's that simple.", btn: "Book Now", action: "/turfs", featured: true },
  ];

  const facilities = [
    { icon: "💡", title: "Floodlit Grounds", desc: "Play day or night with premium lighting systems" },
    { icon: "🚿", title: "Changing Rooms", desc: "Clean, spacious changing facilities post-game" },
    { icon: "🅿️", title: "Free Parking", desc: "Ample secure parking for all players" },
    { icon: "🎽", title: "Kit Rental", desc: "Premium sports kit available on rental" },
    { icon: "🏆", title: "Tournaments", desc: "Regular competitive leagues and tournaments" },
    { icon: "📸", title: "Live Streaming", desc: "Record and stream your matches live" },
  ];

  const testimonials = [
    { name: "Rahul Das", role: "Football Captain", text: "Best turf booking experience in Kolkata. The slots are always available and the app is super smooth.", avatar: "R" },
    { name: "Priya Sen", role: "Badminton Player", text: "Love how easy it is to book. No more calling and waiting — just pick a time and show up!", avatar: "P" },
    { name: "Amit Roy", role: "Cricket Enthusiast", text: "World class facilities at unbeatable prices. TurfArena has completely changed how we plan matches.", avatar: "A" },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#060a06" }}>

      {/* ══════════════════════════════════
          HERO SECTION
      ══════════════════════════════════ */}
      <div className="relative h-screen w-full overflow-hidden">

        {/* Slides */}
        {slides.map((slide, i) => (
          <div key={i}
            className="absolute inset-0 transition-opacity duration-1500"
            style={{ opacity: i === currentSlide ? 1 : 0, transition: "opacity 1.2s ease" }}>
            <img src={slide.image} alt="turf" className="w-full h-full object-cover"
              style={{ transform: `scale(1.05) translateY(${scrollY * 0.3}px)`, transition: "transform 0.1s linear" }} />
          </div>
        ))}

        {/* Gradient overlays */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,10,6,1) 0%, transparent 40%)" }} />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full opacity-20"
          style={{ background: "linear-gradient(to bottom, transparent, #facc15, transparent)", marginRight: "20%" }} />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ paddingTop: "80px" }}>

          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#facc15" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "#facc15" }}>
              {slides[currentSlide].tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-black uppercase leading-none mb-1"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}>
            {slides[currentSlide].title}
          </h1>
          <h1 className="font-black uppercase leading-none mb-8"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "#facc15", letterSpacing: "-0.02em", WebkitTextStroke: "1px #facc15" }}>
            {slides[currentSlide].highlight}
          </h1>

          <p className="text-white/50 mb-10 max-w-md"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.7 }}>
            Kolkata's most trusted platform for premium turf bookings. Instant confirmation. No hassle.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate("/turfs")}
              className="group flex items-center gap-3 font-black uppercase tracking-wider transition-all duration-300"
              style={{ background: "#facc15", color: "#000", padding: "16px 32px", fontSize: "14px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fde047"}
              onMouseLeave={e => e.currentTarget.style.background = "#facc15"}>
              Book Your Game
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button onClick={() => navigate("/register")}
              className="font-black uppercase tracking-wider transition-all duration-300"
              style={{ border: "2px solid rgba(255,255,255,0.4)", color: "white", padding: "16px 32px", fontSize: "14px", background: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}>
              Join Free
            </button>
          </div>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? "3px" : "2px",
                height: i === currentSlide ? "32px" : "16px",
                background: i === currentSlide ? "#facc15" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease"
              }} />
          ))}
        </div>

        {/* Mobile dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? "24px" : "8px",
                height: "3px",
                background: i === currentSlide ? "#facc15" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease", borderRadius: "2px"
              }} />
          ))}
        </div>

        {/* Slider arrows */}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "20px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(250,204,21,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ‹
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "20px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(250,204,21,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ›
        </button>
      </div>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <div style={{ background: "#facc15" }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((s, i) => (
              <div key={i}
                className="text-center py-4 flex flex-col items-center"
                style={{ borderRight: i < 3 ? "1px solid rgba(0,0,0,0.15)" : "none" }}>
                <div className="font-black text-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", lineHeight: 1 }}>{s.number}</div>
                <div className="text-black/60 font-semibold text-xs mt-1 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <div style={{ background: "#060a06", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#facc15" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#facc15" }}>Simple Process</span>
            </div>
            <h2 className="font-black uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              HOW IT <br />
              <span style={{ color: "#facc15" }}>WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i}
                className="group relative transition-all duration-300"
                style={{
                  background: s.featured ? "#facc15" : "#0d140d",
                  border: s.featured ? "none" : "1px solid #1a2e1a",
                  padding: "36px 32px",
                }}
                onMouseEnter={e => { if (!s.featured) e.currentTarget.style.borderColor = "#4ade80"; }}
                onMouseLeave={e => { if (!s.featured) e.currentTarget.style.borderColor = "#1a2e1a"; }}>

                {/* Step number */}
                <div className="font-black mb-6" style={{ fontSize: "4rem", lineHeight: 1, color: s.featured ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.05)" }}>
                  {s.icon}
                </div>

                <div className="text-3xl mb-4">{s.emoji}</div>
                <h3 className="text-xl font-black uppercase mb-3" style={{ color: s.featured ? "#000" : "white" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: s.featured ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)" }}>
                  {s.desc}
                </p>
                <button onClick={() => navigate(s.action)}
                  className="font-black uppercase tracking-wider text-sm transition-all duration-200"
                  style={{
                    background: s.featured ? "#000" : "transparent",
                    color: s.featured ? "#facc15" : "white",
                    border: s.featured ? "none" : "1px solid rgba(255,255,255,0.3)",
                    padding: "12px 24px",
                    width: "100%",
                  }}
                  onMouseEnter={e => { if (!s.featured) { e.currentTarget.style.background = "#facc15"; e.currentTarget.style.color = "#000"; e.currentTarget.style.border = "1px solid #facc15"; }}}
                  onMouseLeave={e => { if (!s.featured) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; e.currentTarget.style.border = "1px solid rgba(255,255,255,0.3)"; }}}>
                  {s.btn} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          FACILITIES
      ══════════════════════════════════ */}
      <div style={{ background: "#0a0f0a", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#facc15" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#facc15" }}>World Class</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              OUR <span style={{ color: "#facc15" }}>FACILITIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <div key={i}
                className="flex items-start gap-4 group transition-all duration-300"
                style={{ background: "#0d140d", border: "1px solid #1a2e1a", padding: "24px" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#4ade80"; e.currentTarget.style.background = "#111a11"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a2e1a"; e.currentTarget.style.background = "#0d140d"; }}>
                <div className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "#1a2e1a", border: "1px solid #2a4a2a" }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1 text-sm">{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════ */}
      <div style={{ background: "#060a06", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#facc15" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#facc15" }}>Player Stories</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              WHAT PLAYERS <span style={{ color: "#facc15" }}>SAY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i}
                style={{ background: "#0d140d", border: "1px solid #1a2e1a", padding: "28px" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "#facc15", fontSize: "12px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: "#facc15", color: "#000" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          CTA SECTION
      ══════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "#0f1f0f", padding: "120px 24px" }}>

        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-black uppercase" style={{ fontSize: "clamp(6rem, 20vw, 16rem)", color: "rgba(255,255,255,0.02)", letterSpacing: "-0.05em" }}>PLAY</span>
        </div>

        {/* Yellow corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5"
          style={{ background: "#facc15", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#facc15" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#facc15" }}>Limited Slots Available</span>
            <div className="w-8 h-px" style={{ background: "#facc15" }} />
          </div>
          <h2 className="font-black uppercase mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>
            READY TO<br /><span style={{ color: "#facc15" }}>PLAY?</span>
          </h2>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", lineHeight: 1.7 }}>
            Join thousands of players booking their favourite turfs every day across Kolkata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/turfs")}
              className="font-black uppercase tracking-wider transition-all duration-200"
              style={{ background: "#facc15", color: "#000", padding: "18px 40px", fontSize: "15px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fde047"}
              onMouseLeave={e => e.currentTarget.style.background = "#facc15"}>
              Book Now →
            </button>
            <button onClick={() => navigate("/register")}
              className="font-black uppercase tracking-wider transition-all duration-200"
              style={{ border: "2px solid rgba(255,255,255,0.3)", color: "white", padding: "18px 40px", fontSize: "15px", background: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <div style={{ background: "#030703", padding: "48px 24px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8"
            style={{ borderBottom: "1px solid #1a2e1a" }}>

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 flex items-center justify-center font-black text-sm"
                  style={{ background: "#facc15", color: "#000" }}>T</div>
                <span className="font-black text-white text-xl">TurfArena</span>
              </div>
              <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                Train · Play · Repeat
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: "Home", path: "/" },
                { label: "Turfs", path: "/turfs" },
                { label: "Register", path: "/register" },
                { label: "Login", path: "/login" },
              ].map((l) => (
                <button key={l.path} onClick={() => navigate(l.path)}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#facc15"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© 2025 TurfArena. All rights reserved.</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.15)" }}>Kolkata, West Bengal, India</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;