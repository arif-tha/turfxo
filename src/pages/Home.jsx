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

  const games = [
    { id: 1, name: "Football", icon: "⚽", color: "#ff6b6b" },
    { id: 2, name: "Cricket", icon: "🏏", color: "#4ecdc4" },
    { id: 3, name: "Badminton", icon: "🏸", color: "#95e1d3" },
    { id: 4, name: "Volleyball", icon: "🏐", color: "#f38181" },
    { id: 5, name: "Basketball", icon: "🏀", color: "#aa96da" },
    { id: 6, name: "Tennis", icon: "🎾", color: "#fcbad3" },
  ];

  const gallery = [
    { id: 1, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop", title: "Professional Football Courts" },
    { id: 2, image: "https://images.unsplash.com/photo-1624526267942-ab67cb7db225?w=600&h=400&fit=crop", title: "Premium Cricket Pitches" },
    { id: 3, image: "https://images.unsplash.com/photo-1555318519-f1b45b78cbef?w=600&h=400&fit=crop", title: "Badminton Courts" },
    { id: 4, image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&h=400&fit=crop", title: "Modern Changing Rooms" },
    { id: 5, image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop", title: "Floodlit Night View" },
    { id: 6, image: "https://images.unsplash.com/photo-1542461835-70d3f3b3c6b1?w=600&h=400&fit=crop", title: "Tournament Ready Grounds" },
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", background: "#ffffff" }}>

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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,41,59,0.90) 40%, rgba(30,41,59,0.4) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 40%)" }} />

        {/* Subtle accent line */}
        <div className="absolute top-0 right-0 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #1e293b, transparent)", marginRight: "20%" }} />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ paddingTop: "80px" }}>

          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#0066cc" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#0066cc" }}>
              {slides[currentSlide].tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold uppercase leading-none mb-1"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", color: "rgba(255,255,255,0.98)", letterSpacing: "-0.01em" }}>
            {slides[currentSlide].title}
          </h1>
          <h1 className="font-bold uppercase leading-none mb-8"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)", color: "#0066cc", letterSpacing: "-0.01em" }}>
            {slides[currentSlide].highlight}
          </h1>

          <p className="text-white/60 mb-10 max-w-md"
            style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.7 }}>
            Kolkata's most trusted platform for premium turf bookings. Instant confirmation. No hassle.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate("/turfs")}
              className="group flex items-center gap-3 font-semibold uppercase tracking-wide transition-all duration-300"
              style={{ background: "#0066cc", color: "#fff", padding: "14px 32px", fontSize: "14px", borderRadius: "6px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#0052a3"}
              onMouseLeave={e => e.currentTarget.style.background = "#0066cc"}>
              Book Your Game
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button onClick={() => navigate("/register")}
              className="font-semibold uppercase tracking-wide transition-all duration-300"
              style={{ border: "2px solid rgba(255,255,255,0.6)", color: "white", padding: "14px 32px", fontSize: "14px", background: "transparent", borderRadius: "6px" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)"; }}>
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
                background: i === currentSlide ? "#0066cc" : "rgba(255,255,255,0.4)",
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
                background: i === currentSlide ? "#0066cc" : "rgba(255,255,255,0.4)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease", borderRadius: "2px"
              }} />
          ))}
        </div>

        {/* Slider arrows */}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: "20px", borderRadius: "6px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,102,204,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
          ‹
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "white", fontSize: "20px", borderRadius: "6px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(0,102,204,0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
          ›
        </button>
      </div>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <div style={{ background: "#f0f4f8", borderTop: "1px solid #e2e8f0" }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map((s, i) => (
              <div key={i}
                className="text-center py-4 flex flex-col items-center"
                style={{ borderRight: i < 3 ? "1px solid #cbd5e1" : "none" }}>
                <div className="font-bold text-slate-800" style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1 }}>{s.number}</div>
                <div className="text-slate-600 font-semibold text-xs mt-2 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════ */}
      <div style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Simple Process</span>
            </div>
            <h2 className="font-bold uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              HOW IT <br />
              <span style={{ color: "#0066cc" }}>WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i}
                className="group relative transition-all duration-300"
                style={{
                  background: s.featured ? "#0066cc" : "#f8fafc",
                  border: s.featured ? "none" : "1px solid #e2e8f0",
                  padding: "36px 32px",
                  borderRadius: "8px"
                }}
                onMouseEnter={e => { if (!s.featured) e.currentTarget.style.borderColor = "#0066cc"; }}
                onMouseLeave={e => { if (!s.featured) e.currentTarget.style.borderColor = "#e2e8f0"; }}>

                {/* Step number */}
                <div className="font-bold mb-6" style={{ fontSize: "3rem", lineHeight: 1, color: s.featured ? "rgba(255,255,255,0.15)" : "rgba(30,41,59,0.05)" }}>
                  {s.icon}
                </div>

                <div className="text-2xl mb-4">{s.emoji}</div>
                <h3 className="text-lg font-bold uppercase mb-3" style={{ color: s.featured ? "#fff" : "#1e293b" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: s.featured ? "rgba(255,255,255,0.85)" : "#64748b" }}>
                  {s.desc}
                </p>
                <button onClick={() => navigate(s.action)}
                  className="font-semibold uppercase tracking-wider text-sm transition-all duration-200"
                  style={{
                    background: s.featured ? "#fff" : "transparent",
                    color: s.featured ? "#0066cc" : "#0066cc",
                    border: s.featured ? "none" : "1px solid #0066cc",
                    padding: "12px 24px",
                    width: "100%",
                    borderRadius: "6px"
                  }}
                  onMouseEnter={e => { if (!s.featured) { e.currentTarget.style.background = "#0066cc"; e.currentTarget.style.color = "#fff"; }}}
                  onMouseLeave={e => { if (!s.featured) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0066cc"; }}}>
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
      <div style={{ background: "#f8fafc", padding: "100px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>World Class</span>
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              OUR <span style={{ color: "#0066cc" }}>FACILITIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <div key={i}
                className="flex items-start gap-4 group transition-all duration-300"
                style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: "8px" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#0066cc"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,102,204,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "#f0f4f8", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1 text-sm">{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════ */}
      <div style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Player Stories</span>
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              WHAT PLAYERS <span style={{ color: "#0066cc" }}>SAY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i}
                style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "28px", borderRadius: "8px" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "#0066cc", fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center font-semibold text-sm flex-shrink-0"
                    style={{ background: "#0066cc", color: "#fff", borderRadius: "50%" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          SELECT GAMES SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#f8fafc", padding: "100px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Choose Your Sport</span>
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              SELECT <span style={{ color: "#0066cc" }}>YOUR GAME</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map((game) => (
              <div key={game.id}
                className="group cursor-pointer transition-all duration-300 text-center"
                onClick={() => navigate("/turfs")}
                style={{
                  background: "#ffffff",
                  border: "2px solid #e2e8f0",
                  padding: "28px 16px",
                  borderRadius: "8px",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#0066cc";
                  e.currentTarget.style.background = "#f0f4f8";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div className="text-4xl mb-3">{game.icon}</div>
                <h3 className="font-semibold text-slate-700 text-sm">{game.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          EXPLORE OUR GAMES SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Available Sports</span>
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              EXPLORE OUR <span style={{ color: "#0066cc" }}>GAMES</span>
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl">
              From football to tennis, we offer premium facilities for all your favorite sports. Each turf is equipped with world-class amenities and professional maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div key={game.id}
                onClick={() => navigate("/turfs")}
                className="group cursor-pointer transition-all duration-300"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#0066cc";
                  e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,102,204,0.15)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                
                <div className="h-40 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, rgba(0,102,204,0.08), rgba(0,102,204,0.02))` }}>
                  {game.icon}
                </div>
                
                <div style={{ padding: "24px" }}>
                  <h3 className="font-semibold text-slate-800 text-lg mb-2">{game.name}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "#64748b" }}>
                    Book premium {game.name.toLowerCase()} courts with instant confirmation and flexible timings.
                  </p>
                  <button onClick={() => navigate("/turfs")}
                    className="font-semibold text-sm transition-colors duration-200"
                    style={{ color: "#0066cc", background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#004a99"}
                    onMouseLeave={e => e.currentTarget.style.color = "#0066cc"}>
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          GALLERY SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#f8fafc", padding: "100px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Visual Tour</span>
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              OUR <span style={{ color: "#0066cc" }}>GALLERY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <div key={item.id}
                className="group relative overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: "8px",
                  aspectRatio: "1/0.75",
                }}
                onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ borderRadius: "8px" }} />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-start"
                  style={{ borderRadius: "8px", padding: "24px" }}>
                  <h3 className="font-semibold text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          CONTACT INFORMATION SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#ffffff", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Get In Touch</span>
              <div className="w-8 h-px" style={{ background: "#0066cc" }} />
            </div>
            <h2 className="font-bold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1e293b" }}>
              CONTACT <span style={{ color: "#0066cc" }}>INFORMATION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📍",
                title: "Address",
                details: ["Kolkata, West Bengal", "India"],
                link: "",
              },
              {
                icon: "📞",
                title: "Phone",
                details: ["+91 98765 43210", "Call us anytime"],
                link: "tel:+919876543210",
              },
              {
                icon: "✉️",
                title: "Email",
                details: ["info@turfarena.com", "support@turfarena.com"],
                link: "mailto:info@turfarena.com",
              },
            ].map((contact, i) => (
              <a key={i} href={contact.link} className="group text-decoration-none"
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "36px 28px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "block",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#0066cc";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,102,204,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div className="text-3xl mb-4">{contact.icon}</div>
                <h3 className="font-semibold text-slate-800 text-lg mb-3">{contact.title}</h3>
                <div className="space-y-1">
                  {contact.details.map((detail, j) => (
                    <p key={j} className="text-sm" style={{ color: "#64748b" }}>
                      {detail}
                    </p>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          CTA SECTION
      ══════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ background: "#f0f4f8", padding: "120px 24px", borderTop: "1px solid #e2e8f0" }}>

        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-bold uppercase" style={{ fontSize: "clamp(6rem, 20vw, 16rem)", color: "rgba(30,41,59,0.03)", letterSpacing: "-0.05em" }}>PLAY</span>
        </div>

        {/* Subtle corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-3"
          style={{ background: "#0066cc", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#0066cc" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0066cc" }}>Limited Slots Available</span>
            <div className="w-8 h-px" style={{ background: "#0066cc" }} />
          </div>
          <h2 className="font-bold uppercase mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", color: "#1e293b", lineHeight: 1, letterSpacing: "-0.01em" }}>
            READY TO<br /><span style={{ color: "#0066cc" }}>PLAY?</span>
          </h2>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.7 }}>
            Join thousands of players booking their favourite turfs every day across Kolkata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/turfs")}
              className="font-semibold uppercase tracking-wider transition-all duration-200"
              style={{ background: "#0066cc", color: "#fff", padding: "18px 40px", fontSize: "15px", borderRadius: "6px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#0052a3"}
              onMouseLeave={e => e.currentTarget.style.background = "#0066cc"}>
              Book Now →
            </button>
            <button onClick={() => navigate("/register")}
              className="font-semibold uppercase tracking-wider transition-all duration-200"
              style={{ border: "2px solid #0066cc", color: "#0066cc", padding: "18px 40px", fontSize: "15px", background: "transparent", borderRadius: "6px" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#0066cc"; e.currentTarget.style.background = "#f0f4f8"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#0066cc"; e.currentTarget.style.background = "transparent"; }}>
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <div style={{ background: "#1e293b", padding: "48px 24px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8"
            style={{ borderBottom: "1px solid #334155" }}>

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 flex items-center justify-center font-semibold text-sm"
                  style={{ background: "#0066cc", color: "#fff", borderRadius: "6px" }}>T</div>
                <span className="font-semibold text-white text-xl">TurfArena</span>
              </div>
              <p className="text-xs tracking-widest uppercase" style={{ color: "#94a3b8" }}>
                Train · Play · Repeat
              </p>
              <p className="text-xs mt-3" style={{ color: "#cbd5e1" }}>
                Kolkata's premier turf booking platform for all sports lovers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: "Home", path: "/" },
                  { label: "Turfs", path: "/turfs" },
                  { label: "Book Your Games", path: "/turfs" },
                  { label: "Register", path: "/register" },
                ].map((l) => (
                  <button key={l.path} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "#cbd5e1", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0066cc"}
                    onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
              <div className="space-y-2">
                {[
                  { label: "Contact Us", path: "#" },
                  { label: "FAQ", path: "#" },
                  { label: "Support", path: "#" },
                  { label: "Feedback", path: "#" },
                ].map((l) => (
                  <button key={l.label} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "#cbd5e1", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0066cc"}
                    onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Legal</h4>
              <div className="space-y-2">
                {[
                  { label: "Privacy Policy", path: "#" },
                  { label: "Terms of Service", path: "#" },
                  { label: "Cookie Policy", path: "#" },
                  { label: "Cancellation Policy", path: "#" },
                ].map((l) => (
                  <button key={l.label} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "#cbd5e1", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0066cc"}
                    onMouseLeave={e => e.currentTarget.style.color = "#cbd5e1"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <p className="text-xs" style={{ color: "#64748b" }}>© 2025 TurfArena. All rights reserved.</p>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <button key={social}
                  className="text-xs font-semibold transition-colors duration-200"
                  style={{ color: "#64748b", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#0066cc"}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
