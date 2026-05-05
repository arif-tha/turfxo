import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  GlassCard,
  AnimatedButton,
  SportsLoader,
  TextReveal,
  FloatingElement,
} from "../components/animations/AnimatedComponents";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  containerVariants,
  itemVariants,
  hoverScale,
  hoverGlow,
} from "../utils/animationConfig";

/* ─── Premium font injection ─────────────────────────────────── */
const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  :root {
    --ivory:   #FAF8F3;
    --cream:   #F3EFE6;
    --linen:   #EDE8DC;
    --gold:    #C9A84C;
    --gold-lt: #E4C97A;
    --gold-dk: #9E7A2A;
    --forest:  #1E4D2B;
    --forest2: #2A6638;
    --sage:    #5A8A63;
    --charcoal:#1A1A1A;
    --ink:     #2C2C2C;
    --muted:   #7A7068;
    --border:  rgba(201,168,76,0.25);
    --shadow:  0 4px 40px rgba(30,77,43,0.10);
    --shadow-lg: 0 16px 60px rgba(30,77,43,0.15);
  }

  * { box-sizing: border-box; }

  body { background: var(--ivory); }

  .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-body    { font-family: 'Outfit', sans-serif; }

  .gold-line::before {
    content: '';
    display: inline-block;
    width: 40px;
    height: 1px;
    background: linear-gradient(90deg, var(--gold), transparent);
    vertical-align: middle;
    margin-right: 12px;
  }

  .section-label {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold-dk);
  }

  .noise-bg {
    position: relative;
  }
  .noise-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .premium-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: var(--shadow);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }
  .premium-card:hover {
    box-shadow: var(--shadow-lg);
  }

  .btn-primary {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--forest), var(--forest2));
    color: #fff;
    border: none;
    padding: 16px 36px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .btn-primary:hover { box-shadow: 0 8px 30px rgba(30,77,43,0.4); }
  .btn-primary:hover::after { opacity: 0.2; }

  .btn-outline {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: transparent;
    color: var(--forest);
    border: 1.5px solid var(--forest);
    padding: 15px 36px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn-outline:hover {
    background: var(--forest);
    color: #fff;
  }

  .btn-gold {
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    color: var(--charcoal);
    border: none;
    padding: 16px 36px;
    border-radius: 4px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
  }
  .btn-gold:hover { box-shadow: 0 8px 30px rgba(201,168,76,0.5); }

  .hero-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -0.02em;
    color: #fff;
  }

  .section-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-weight: 700;
    line-height: 0.95;
    color: var(--charcoal);
    letter-spacing: -0.02em;
  }

  .divider-gold {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-lt));
    border-radius: 2px;
  }

  /* Scroll indicator */
  .scroll-indicator {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--forest));
    transform-origin: left;
    z-index: 9999;
  }
`;

function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

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
    setIsHeroLoaded(true);
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
    { id: 1, name: "Football", icon: "⚽", color: "#1E4D2B" },
    { id: 2, name: "Cricket", icon: "🏏", color: "#2A6638" },
    { id: 3, name: "Badminton", icon: "🏸", color: "#1E4D2B" },
    { id: 4, name: "Volleyball", icon: "🏐", color: "#2A6638" },
    { id: 5, name: "Basketball", icon: "🏀", color: "#1E4D2B" },
    { id: 6, name: "Tennis", icon: "🎾", color: "#2A6638" },
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
    <>
      <style>{fontStyle}</style>

      <div
        className="w-full min-h-screen overflow-x-hidden font-body noise-bg"
        style={{ background: "var(--ivory)", fontFamily: "'Outfit', sans-serif" }}
      >
        {/* ── SCROLL PROGRESS ─────────────────────────────────── */}
        <motion.div
          className="scroll-indicator"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) }}
          transition={{ type: "spring", stiffness: 1000, damping: 100 }}
          style={{ willChange: "transform" }}
        />

        {/* ══════════════════════════════════════════════════════
            HERO — FULL HEIGHT, CINEMATIC
        ══════════════════════════════════════════════════════ */}
        <motion.div
          className="relative h-screen w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Slide backgrounds */}
          <AnimatePresence>
            {slides.map((slide, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: i === currentSlide ? 1 : 0, scale: i === currentSlide ? 1 : 1.06 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              >
                <motion.img
                  src={slide.image}
                  alt="turf"
                  className="w-full h-full object-cover"
                  animate={{ scale: 1 + scrollY * 0.0002 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Sophisticated gradient overlay — not pure black */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(120deg, rgba(17,38,22,0.88) 0%, rgba(17,38,22,0.65) 50%, rgba(17,38,22,0.30) 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(8,20,12,0.95) 0%, transparent 55%)"
          }} />

          {/* Gold accent top-right */}
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #C9A84C 0%, transparent 65%)",
              filter: "blur(80px)",
            }}
            animate={{ opacity: [0.10, 0.20, 0.10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Decorative corner ornament */}
          <svg className="absolute top-8 right-8 opacity-40 hidden lg:block" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M10 10 L110 10 M10 10 L10 110" stroke="#C9A84C" strokeWidth="1" opacity="0.6"/>
            <path d="M30 10 L10 10 L10 30" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
            <circle cx="110" cy="110" r="3" fill="#C9A84C" opacity="0.4"/>
            <path d="M90 110 L110 110 L110 90" stroke="#C9A84C" strokeWidth="0.5" opacity="0.4"/>
          </svg>

          {/* Hero content */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-28"
            style={{ paddingTop: "80px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHeroLoaded ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Tag line */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div style={{ width: 32, height: 1, background: "var(--gold)" }} />
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-lt)"
              }}>
                {slides[currentSlide].tag}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              <h1 className="hero-heading" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", color: "rgba(255,255,255,0.95)" }}>
                {slides[currentSlide].title}
              </h1>
              <h1 className="hero-heading" style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                background: "linear-gradient(135deg, #E4C97A, #C9A84C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "2rem"
              }}>
                {slides[currentSlide].highlight}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.70)",
                maxWidth: 460,
                lineHeight: 1.85,
                marginBottom: "3rem",
                letterSpacing: "0.01em"
              }}
            >
              Kolkata's most trusted platform for premium turf bookings. Instant confirmation. Zero hassle. Pure play.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.button
                onClick={() => navigate("/turfs")}
                className="btn-gold flex items-center gap-2"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Book Your Game
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
              </motion.button>

              <motion.button
                onClick={() => navigate("/register")}
                className="btn-outline"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,0.45)" }}
                whileHover={{ scale: 1.04, y: -2, background: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Join Free
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Slide indicators — vertical on desktop */}
          <motion.div
            className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? 3 : 2,
                  height: i === currentSlide ? 40 : 16,
                  borderRadius: 99,
                  background: i === currentSlide ? "var(--gold)" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>

          {/* Mobile dots */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  width: i === currentSlide ? 24 : 8,
                  height: 3,
                  borderRadius: 99,
                  background: i === currentSlide ? "var(--gold)" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </motion.div>

          {/* Arrows */}
          {[
            { dir: "left", label: "‹", pos: "left-4", action: (prev) => (prev - 1 + slides.length) % slides.length },
            { dir: "right", label: "›", pos: "right-4", action: (prev) => (prev + 1) % slides.length },
          ].map(({ dir, label, pos, action }) => (
            <motion.button
              key={dir}
              onClick={() => setCurrentSlide(action)}
              className={`absolute ${pos} top-1/2 -translate-y-1/2`}
              style={{
                width: 48, height: 48, borderRadius: 4,
                backdropFilter: "blur(12px)",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(201,168,76,0.35)",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
              whileHover={{ scale: 1.1, borderColor: "rgba(201,168,76,0.8)", background: "rgba(201,168,76,0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
            </motion.button>
          ))}

          {/* Bottom decorative strip */}
          <div className="absolute bottom-0 left-0 right-0 h-24" style={{
            background: "linear-gradient(to bottom, transparent, var(--ivory))"
          }} />
        </motion.div>

        {/* ══════════════════════════════════════════════════════
            STATS BAR — IVORY WITH GOLD ACCENTS
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--cream)", borderBottom: "1px solid var(--border)", position: "relative", zIndex: 10 }}>
          {/* Gold decorative top line */}
          <div style={{ height: 3, background: "linear-gradient(90deg, var(--forest), var(--gold), var(--forest))" }} />

          <motion.div
            className="py-16 px-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Number */}
                    <motion.div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                        fontWeight: 700,
                        color: "var(--forest)",
                        lineHeight: 1,
                        marginBottom: 6
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ delay: i * 0.15, duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {s.number}
                    </motion.div>
                    {/* Divider */}
                    <div style={{ width: 28, height: 1, background: "var(--gold)", margin: "8px auto 10px" }} />
                    {/* Label */}
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--muted)"
                    }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS — CLEAN IVORY + EDITORIAL
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--ivory)", padding: "120px 24px", position: "relative" }}>
          {/* Decorative watermark */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(8rem, 18vw, 18rem)",
            fontWeight: 700,
            color: "rgba(30,77,43,0.04)",
            letterSpacing: "-0.05em",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap"
          }}>
            PLAY
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="mb-20 text-center">
                <span className="section-label gold-line">Simple Process</span>
                <h2
                  className="section-heading"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginTop: 16 }}
                >
                  How It <span style={{ color: "var(--forest)", fontStyle: "italic" }}>Works</span>
                </h2>
              </div>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="premium-card"
                    style={{
                      padding: "40px 36px",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      background: s.featured
                        ? "linear-gradient(135deg, var(--forest), var(--forest2))"
                        : "#fff",
                    }}
                  >
                    {/* Step number watermark */}
                    <div style={{
                      position: "absolute",
                      top: -10,
                      right: 20,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "7rem",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: s.featured ? "rgba(255,255,255,0.08)" : "rgba(30,77,43,0.06)",
                      userSelect: "none"
                    }}>
                      {s.icon}
                    </div>

                    {/* Gold top accent bar */}
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0,
                      height: 3,
                      background: s.featured
                        ? "linear-gradient(90deg, var(--gold-lt), transparent)"
                        : "linear-gradient(90deg, var(--gold), transparent)"
                    }} />

                    <div style={{ fontSize: "2.8rem", marginBottom: 24 }}>{s.emoji}</div>

                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "1.65rem",
                      fontWeight: 700,
                      color: s.featured ? "#fff" : "var(--charcoal)",
                      marginBottom: 12,
                      letterSpacing: "-0.01em"
                    }}>
                      {s.title}
                    </h3>

                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.75,
                      color: s.featured ? "rgba(255,255,255,0.75)" : "var(--muted)",
                      marginBottom: 32
                    }}>
                      {s.desc}
                    </p>

                    <motion.button
                      onClick={() => navigate(s.action)}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        background: s.featured ? "rgba(255,255,255,0.15)" : "transparent",
                        color: s.featured ? "#fff" : "var(--forest)",
                        border: s.featured ? "1px solid rgba(255,255,255,0.3)" : "1px solid var(--forest)",
                        padding: "12px 24px",
                        borderRadius: 4,
                        cursor: "pointer",
                        width: "100%",
                        transition: "all 0.3s ease"
                      }}
                      whileHover={{
                        background: s.featured ? "rgba(255,255,255,0.25)" : "var(--forest)",
                        color: s.featured ? "#fff" : "#fff"
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {s.btn} →
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            FACILITIES — LINEN BG, ICON CARDS
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--linen)", padding: "120px 24px", position: "relative" }}>
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="mb-20">
              <span className="section-label gold-line">World Class</span>
              <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginTop: 16 }}>
                Our <span style={{ color: "var(--forest)", fontStyle: "italic" }}>Facilities</span>
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {facilities.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="premium-card"
                    style={{ padding: "36px 32px", height: "100%", background: "#fff" }}
                  >
                    <motion.div
                      style={{
                        width: 56, height: 56,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.8rem",
                        marginBottom: 20,
                        borderRadius: 8,
                        background: "rgba(30,77,43,0.07)",
                        border: "1px solid rgba(30,77,43,0.12)"
                      }}
                      whileHover={{ scale: 1.1, rotate: 8 }}
                    >
                      {f.icon}
                    </motion.div>

                    {/* Gold line separator */}
                    <div style={{ width: 28, height: 1.5, background: "var(--gold)", marginBottom: 16 }} />

                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--charcoal)",
                      marginBottom: 8
                    }}>
                      {f.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "var(--muted)"
                    }}>
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            TESTIMONIALS — FOREST GREEN SECTION
        ══════════════════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, var(--forest) 0%, #122D1A 100%)",
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Gold radial glow */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: 500, height: 500,
            background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)",
            pointerEvents: "none"
          }} />
          {/* Watermark */}
          <div style={{
            position: "absolute", bottom: -30, left: -20,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(6rem, 16vw, 14rem)",
            fontWeight: 700,
            color: "rgba(255,255,255,0.04)",
            letterSpacing: "-0.05em",
            pointerEvents: "none",
            userSelect: "none"
          }}>
            ARENA
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal className="mb-20">
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-lt)"
              }} className="gold-line">
                Player Stories
              </span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                color: "#fff",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginTop: 16
              }}>
                What Players <span style={{ color: "var(--gold-lt)", fontStyle: "italic" }}>Say</span>
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 16,
                    padding: "40px 36px",
                    backdropFilter: "blur(10px)",
                    height: "100%"
                  }}>
                    {/* Gold quote mark */}
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "4rem",
                      lineHeight: 1,
                      color: "var(--gold)",
                      marginBottom: 8,
                      opacity: 0.6
                    }}>
                      "
                    </div>

                    {/* Stars */}
                    <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                      {[...Array(5)].map((_, j) => (
                        <span key={j} style={{ color: "var(--gold-lt)", fontSize: 14 }}>★</span>
                      ))}
                    </div>

                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "rgba(255,255,255,0.80)",
                      marginBottom: 32,
                      fontStyle: "italic"
                    }}>
                      {t.text}
                    </p>

                    {/* Gold divider */}
                    <div style={{ width: 28, height: 1, background: "var(--gold)", marginBottom: 20, opacity: 0.5 }} />

                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 44, height: 44,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--gold), var(--gold-lt))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 800,
                        fontSize: 16,
                        color: "var(--forest)",
                        flexShrink: 0
                      }}>
                        {t.avatar}
                      </div>
                      <div>
                        <p style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 600, fontSize: 14,
                          color: "#fff", marginBottom: 2
                        }}>
                          {t.name}
                        </p>
                        <p style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 12,
                          color: "rgba(255,255,255,0.5)",
                          letterSpacing: "0.05em"
                        }}>
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            SELECT YOUR GAME — IVORY + INTERACTIVE
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--ivory)", padding: "120px 24px", position: "relative" }}>
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal className="mb-20 text-center">
              <span className="section-label gold-line">Choose Your Sport</span>
              <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginTop: 16 }}>
                Select <span style={{ color: "var(--forest)", fontStyle: "italic" }}>Your Game</span>
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  variants={itemVariants}
                  onClick={() => navigate("/turfs")}
                  style={{
                    padding: "28px 16px",
                    borderRadius: 12,
                    background: "#fff",
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                    textAlign: "center",
                    boxShadow: "0 2px 20px rgba(30,77,43,0.06)",
                    transition: "all 0.3s ease"
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.04,
                    boxShadow: "0 16px 40px rgba(30,77,43,0.18)",
                    borderColor: "var(--gold)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    style={{ fontSize: "2.8rem", marginBottom: 14 }}
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ delay: i * 0.15, duration: 3.5, repeat: Infinity }}
                  >
                    {game.icon}
                  </motion.div>
                  {/* Gold line */}
                  <div style={{ width: 20, height: 1.5, background: "var(--gold)", margin: "0 auto 10px" }} />
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--charcoal)"
                  }}>
                    {game.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            GALLERY — CREAM BG
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--cream)", padding: "120px 24px" }}>
          <div className="max-w-6xl mx-auto">
            <ScrollReveal className="mb-20">
              <span className="section-label gold-line">Visual Tour</span>
              <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginTop: 16 }}>
                Our <span style={{ color: "var(--forest)", fontStyle: "italic" }}>Gallery</span>
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {gallery.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 12,
                    aspectRatio: "4/3",
                    boxShadow: "0 4px 30px rgba(30,77,43,0.12)",
                    cursor: "pointer"
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Gold frame on hover */}
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      border: "2px solid var(--gold)",
                      borderRadius: 12,
                      opacity: 0
                    }}
                    whileHover={{ opacity: 0.7 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(17,38,22,0.85) 0%, transparent 55%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 24,
                      opacity: 0
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div style={{ width: 20, height: 1.5, background: "var(--gold)", marginBottom: 8 }} />
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        color: "#fff",
                        letterSpacing: "-0.01em"
                      }}>
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CONTACT — IVORY
        ══════════════════════════════════════════════════════ */}
        <div style={{ background: "var(--ivory)", padding: "120px 24px", position: "relative" }}>
          <div className="max-w-6xl mx-auto relative z-10">
            <ScrollReveal className="mb-20 text-center">
              <span className="section-label gold-line">Get In Touch</span>
              <h2 className="section-heading" style={{ fontSize: "clamp(2.8rem, 6vw, 4.5rem)", marginTop: 16 }}>
                Contact <span style={{ color: "var(--forest)", fontStyle: "italic" }}>Information</span>
              </h2>
            </ScrollReveal>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                { icon: "📍", label: "Address", value: "Kolkata, West Bengal, India", link: "#" },
                { icon: "📞", label: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
                { icon: "✉️", label: "Email", value: "info@turfarena.com", link: "mailto:info@turfarena.com" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={c.link !== "#" ? c.link : undefined} style={{ textDecoration: "none" }}>
                    <div className="premium-card" style={{ padding: "48px 36px", textAlign: "center", height: "100%", background: "#fff" }}>
                      <motion.div
                        style={{
                          width: 64, height: 64,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "2rem",
                          margin: "0 auto 20px",
                          borderRadius: 10,
                          background: "rgba(30,77,43,0.07)",
                          border: "1px solid rgba(30,77,43,0.12)"
                        }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ delay: i * 0.2, duration: 2.5, repeat: Infinity }}
                      >
                        {c.icon}
                      </motion.div>
                      <div style={{ width: 28, height: 1.5, background: "var(--gold)", margin: "0 auto 16px" }} />
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--charcoal)",
                        marginBottom: 8
                      }}>
                        {c.label}
                      </h3>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 14,
                        color: "var(--muted)",
                        wordBreak: "break-all"
                      }}>
                        {c.value}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            CTA SECTION — GOLD GRADIENT + EDITORIAL
        ══════════════════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, var(--forest) 0%, #0D2415 100%)",
          padding: "140px 24px",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative corner ornaments */}
          <svg style={{ position: "absolute", top: 40, left: 40, opacity: 0.25 }} width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M5 5 L95 5 M5 5 L5 95" stroke="#C9A84C" strokeWidth="1"/>
            <path d="M20 5 L5 5 L5 20" stroke="#C9A84C" strokeWidth="0.5"/>
          </svg>
          <svg style={{ position: "absolute", bottom: 40, right: 40, opacity: 0.25, transform: "rotate(180deg)" }} width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M5 5 L95 5 M5 5 L5 95" stroke="#C9A84C" strokeWidth="1"/>
            <path d="M20 5 L5 5 L5 20" stroke="#C9A84C" strokeWidth="0.5"/>
          </svg>

          {/* Gold radial */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600,
            background: "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 65%)",
            pointerEvents: "none"
          }} />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <ScrollReveal>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-lt)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28
              }}>
                <span style={{ width: 32, height: 1, background: "var(--gold-lt)", display: "inline-block" }} />
                Limited Slots Available
                <span style={{ width: 32, height: 1, background: "var(--gold-lt)", display: "inline-block" }} />
              </span>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(3.5rem, 9vw, 6rem)",
                  color: "#fff",
                  lineHeight: 0.95,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem"
                }}>
                  Ready to <span style={{
                    background: "linear-gradient(135deg, var(--gold-lt), var(--gold))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontStyle: "italic"
                  }}>Play?</span>
                </h2>

                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "clamp(15px, 1.4vw, 18px)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.65)",
                  maxWidth: 480,
                  margin: "0 auto 48px",
                  lineHeight: 1.85
                }}>
                  Join thousands of players booking their favourite turfs every day across Kolkata.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.button
                  onClick={() => navigate("/turfs")}
                  className="btn-gold flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book Now
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                </motion.button>
                <motion.button
                  onClick={() => navigate("/register")}
                  className="btn-outline"
                  style={{ color: "#fff", borderColor: "rgba(255,255,255,0.35)" }}
                  whileHover={{ scale: 1.04, y: -2, background: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Create Account
                </motion.button>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            FOOTER — CLEAN CREAM
        ══════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            background: "var(--cream)",
            padding: "80px 24px 48px",
            borderTop: "1px solid var(--border)"
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Gold top bar */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, var(--forest), var(--gold), var(--forest))",
            marginBottom: 64,
            borderRadius: 99
          }} />

          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10"
              style={{ borderBottom: "1px solid var(--border)" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Brand */}
              <motion.div variants={itemVariants}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{
                    width: 34, height: 34,
                    borderRadius: 6,
                    background: "linear-gradient(135deg, var(--forest), var(--forest2))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--gold-lt)"
                  }}>
                    T
                  </div>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "var(--charcoal)",
                    letterSpacing: "-0.01em"
                  }}>
                    TurfArena
                  </span>
                </div>
                <div style={{ width: 28, height: 1.5, background: "var(--gold)", marginBottom: 14 }} />
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: 12
                }}>
                  Train · Play · Repeat
                </p>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "var(--muted)"
                }}>
                  Kolkata's premier turf booking platform for all sports lovers.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--charcoal)",
                  marginBottom: 20
                }}>
                  Quick Links
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Home", path: "/" },
                    { label: "Turfs", path: "/turfs" },
                    { label: "Book Your Games", path: "/turfs" },
                    { label: "Register", path: "/register" },
                  ].map((l) => (
                    <motion.button
                      key={l.path + l.label}
                      onClick={() => navigate(l.path)}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 13,
                        color: "var(--muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0,
                        transition: "color 0.2s ease"
                      }}
                      whileHover={{ x: 6, color: "var(--forest)" }}
                    >
                      {l.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Support */}
              <motion.div variants={itemVariants}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--charcoal)",
                  marginBottom: 20
                }}>
                  Support
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Contact Us", "FAQ", "Support", "Feedback"].map((l) => (
                    <motion.button
                      key={l}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 13,
                        color: "var(--muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0
                      }}
                      whileHover={{ x: 6, color: "var(--forest)" }}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Legal */}
              <motion.div variants={itemVariants}>
                <h4 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--charcoal)",
                  marginBottom: 20
                }}>
                  Legal
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Privacy Policy", "Terms of Service", "Cookie Policy", "Cancellation Policy"].map((l) => (
                    <motion.button
                      key={l}
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 13,
                        color: "var(--muted)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0
                      }}
                      whileHover={{ x: 6, color: "var(--forest)" }}
                    >
                      {l}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                paddingTop: 24
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 12,
                color: "var(--muted)"
              }}>
                © 2025 TurfArena. All rights reserved.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                {["Facebook", "Instagram", "Twitter"].map((social) => (
                  <motion.button
                    key={social}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      color: "var(--muted)",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                    whileHover={{ scale: 1.15, color: "var(--forest)" }}
                  >
                    {social}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </>
  );
}

export default Home;