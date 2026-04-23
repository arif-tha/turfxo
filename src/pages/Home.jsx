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
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0f172a" }}>

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
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,23,42,1) 0%, transparent 40%)" }} />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full opacity-20"
          style={{ background: "linear-gradient(to bottom, transparent, #0ea5e9, transparent)", marginRight: "20%" }} />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ paddingTop: "80px" }}>

          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "#0ea5e9" }}>
              {slides[currentSlide].tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-black uppercase leading-none mb-1"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "rgba(255,255,255,0.95)", letterSpacing: "-0.02em" }}>
            {slides[currentSlide].title}
          </h1>
          <h1 className="font-black uppercase leading-none mb-8"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", color: "#0ea5e9", letterSpacing: "-0.02em", WebkitTextStroke: "1px #0ea5e9" }}>
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
              style={{ background: "#0ea5e9", color: "#000", padding: "16px 32px", fontSize: "14px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fde047"}
              onMouseLeave={e => e.currentTarget.style.background = "#0ea5e9"}>
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
                background: i === currentSlide ? "#0ea5e9" : "rgba(255,255,255,0.3)",
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
                background: i === currentSlide ? "#0ea5e9" : "rgba(255,255,255,0.3)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s ease", borderRadius: "2px"
              }} />
          ))}
        </div>

        {/* Slider arrows */}
        <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "20px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(14,165,233,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ‹
        </button>
        <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", fontSize: "20px" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(14,165,233,0.3)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
          ›
        </button>
      </div>

      {/* ══════════════════════════════════
          STATS BAR
      ══════════════════════════════════ */}
      <div style={{ background: "#0ea5e9" }}>
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
      <div style={{ background: "#0f172a", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Simple Process</span>
            </div>
            <h2 className="font-black uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              HOW IT <br />
              <span style={{ color: "#0ea5e9" }}>WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i}
                className="group relative transition-all duration-300"
                style={{
                  background: s.featured ? "#0ea5e9" : "#1e293b",
                  border: s.featured ? "none" : "1px solid #334155",
                  padding: "36px 32px",
                }}
                onMouseEnter={e => { if (!s.featured) e.currentTarget.style.borderColor = "#0ea5e9"; }}
                onMouseLeave={e => { if (!s.featured) e.currentTarget.style.borderColor = "#334155"; }}>

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
                    color: s.featured ? "#0ea5e9" : "white",
                    border: s.featured ? "none" : "1px solid rgba(255,255,255,0.3)",
                    padding: "12px 24px",
                    width: "100%",
                  }}
                  onMouseEnter={e => { if (!s.featured) { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.color = "#000"; e.currentTarget.style.border = "1px solid #0ea5e9"; }}}
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
      <div style={{ background: "#1a2332", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>World Class</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              OUR <span style={{ color: "#0ea5e9" }}>FACILITIES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <div key={i}
                className="flex items-start gap-4 group transition-all duration-300"
                style={{ background: "#1e293b", border: "1px solid #334155", padding: "24px" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#0ea5e9"; e.currentTarget.style.background = "#111a11"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.background = "#1e293b"; }}>
                <div className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "#334155", border: "1px solid #2a4a2a" }}>
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
      <div style={{ background: "#0f172a", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Player Stories</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              WHAT PLAYERS <span style={{ color: "#0ea5e9" }}>SAY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i}
                style={{ background: "#1e293b", border: "1px solid #334155", padding: "28px" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "#0ea5e9", fontSize: "12px" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center font-black text-sm flex-shrink-0"
                    style={{ background: "#0ea5e9", color: "#000" }}>
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
          SELECT GAMES SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#1a2332", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Choose Your Sport</span>
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              SELECT <span style={{ color: "#0ea5e9" }}>YOUR GAME</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {games.map((game) => (
              <div key={game.id}
                className="group cursor-pointer transition-all duration-300 text-center"
                onClick={() => navigate("/turfs")}
                style={{
                  background: "#1e293b",
                  border: "2px solid #334155",
                  padding: "28px 16px",
                  borderRadius: "12px",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = game.color;
                  e.currentTarget.style.background = `${game.color}20`;
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.background = "#1e293b";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div className="text-4xl mb-3">{game.icon}</div>
                <h3 className="font-bold text-white text-sm">{game.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          EXPLORE OUR GAMES SECTION
      ══════════════════════════════════ */}
      <div style={{ background: "#0f172a", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Available Sports</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              EXPLORE OUR <span style={{ color: "#0ea5e9" }}>GAMES</span>
            </h2>
            <p className="text-white/40 mt-3 max-w-2xl">
              From football to tennis, we offer premium facilities for all your favorite sports. Each turf is equipped with world-class amenities and professional maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <div key={game.id}
                onClick={() => navigate("/turfs")}
                className="group cursor-pointer transition-all duration-300"
                style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = game.color;
                  e.currentTarget.style.boxShadow = `0 0 20px ${game.color}40`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.boxShadow = "none";
                }}>
                
                <div className="h-40 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, ${game.color}30, ${game.color}10)` }}>
                  {game.icon}
                </div>
                
                <div style={{ padding: "24px" }}>
                  <h3 className="font-bold text-white text-lg mb-2">{game.name}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Book premium {game.name.toLowerCase()} courts with instant confirmation and flexible timings.
                  </p>
                  <button onClick={() => navigate("/turfs")}
                    className="font-semibold text-sm transition-colors duration-200"
                    style={{ color: game.color, background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
                    onMouseLeave={e => e.currentTarget.style.color = game.color}>
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
      <div style={{ background: "#1a2332", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Visual Tour</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              OUR <span style={{ color: "#0ea5e9" }}>GALLERY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item, i) => (
              <div key={item.id}
                className="group relative overflow-hidden transition-all duration-300"
                style={{
                  borderRadius: "12px",
                  aspectRatio: "1/0.75",
                }}
                onMouseEnter={e => e.currentTarget.querySelector("img").style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
                <img src={item.image} alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ borderRadius: "12px" }} />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end justify-start"
                  style={{ borderRadius: "12px", padding: "24px" }}>
                  <h3 className="font-bold text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <div style={{ background: "#0f172a", padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Get In Touch</span>
              <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "white" }}>
              CONTACT <span style={{ color: "#0ea5e9" }}>INFORMATION</span>
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
                  background: "#1e293b",
                  border: "1px solid #334155",
                  padding: "36px 28px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  display: "block",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#0ea5e9";
                  e.currentTarget.style.boxShadow = "0 0 20px #0ea5e940";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#334155";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div className="text-3xl mb-4">{contact.icon}</div>
                <h3 className="font-bold text-white text-lg mb-3">{contact.title}</h3>
                <div className="space-y-1">
                  {contact.details.map((detail, j) => (
                    <p key={j} className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
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
      <div className="relative overflow-hidden" style={{ background: "#1e2d3d", padding: "120px 24px" }}>

        {/* Big background text */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
          <span className="font-black uppercase" style={{ fontSize: "clamp(6rem, 20vw, 16rem)", color: "rgba(255,255,255,0.02)", letterSpacing: "-0.05em" }}>PLAY</span>
        </div>

        {/* Yellow corner accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5"
          style={{ background: "#0ea5e9", clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: "#0ea5e9" }}>Limited Slots Available</span>
            <div className="w-8 h-px" style={{ background: "#0ea5e9" }} />
          </div>
          <h2 className="font-black uppercase mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", color: "white", lineHeight: 1, letterSpacing: "-0.02em" }}>
            READY TO<br /><span style={{ color: "#0ea5e9" }}>PLAY?</span>
          </h2>
          <p className="mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", lineHeight: 1.7 }}>
            Join thousands of players booking their favourite turfs every day across Kolkata.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/turfs")}
              className="font-black uppercase tracking-wider transition-all duration-200"
              style={{ background: "#0ea5e9", color: "#000", padding: "18px 40px", fontSize: "15px" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fde047"}
              onMouseLeave={e => e.currentTarget.style.background = "#0ea5e9"}>
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
      <div style={{ background: "#0a0f1e", padding: "48px 24px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8"
            style={{ borderBottom: "1px solid #334155" }}>

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 flex items-center justify-center font-black text-sm"
                  style={{ background: "#0ea5e9", color: "#000" }}>T</div>
                <span className="font-black text-white text-xl">TurfArena</span>
              </div>
              <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                Train · Play · Repeat
              </p>
              <p className="text-xs mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                Kolkata's premier turf booking platform for all sports lovers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { label: "Home", path: "/" },
                  { label: "Turfs", path: "/turfs" },
                  { label: "Book Your Games", path: "/turfs" },
                  { label: "Register", path: "/register" },
                ].map((l) => (
                  <button key={l.path} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Support</h4>
              <div className="space-y-2">
                {[
                  { label: "Contact Us", path: "#" },
                  { label: "FAQ", path: "#" },
                  { label: "Support", path: "#" },
                  { label: "Feedback", path: "#" },
                ].map((l) => (
                  <button key={l.label} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-white mb-4 text-sm">Legal</h4>
              <div className="space-y-2">
                {[
                  { label: "Privacy Policy", path: "#" },
                  { label: "Terms of Service", path: "#" },
                  { label: "Cookie Policy", path: "#" },
                  { label: "Cancellation Policy", path: "#" },
                ].map((l) => (
                  <button key={l.label} onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block"
                    style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© 2025 TurfArena. All rights reserved.</p>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <button key={social}
                  className="text-xs font-semibold transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.2)", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#0ea5e9"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}>
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
