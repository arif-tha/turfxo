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
    <div className="w-full min-h-screen overflow-x-hidden bg-slate-950"
      style={{ fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>

      {/* SCROLL PROGRESS INDICATOR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 origin-left z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight) }}
        transition={{ type: "spring", stiffness: 1000, damping: 100 }}
        style={{ willChange: "transform" }}
      />

      {/* HERO SECTION - PREMIUM REDESIGN */}
      <motion.div
        className="relative h-screen w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background Slides */}
        <AnimatePresence>
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: i === currentSlide ? 1 : 0, scale: i === currentSlide ? 1 : 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <motion.img
                src={slide.image}
                alt="turf"
                className="w-full h-full object-cover"
                animate={{ scale: 1 + scrollY * 0.0003 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.80) 40%, rgba(15,23,42,0.4) 100%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(2,8,23,1) 0%, transparent 50%)"
        }} />

        {/* Animated Accent Elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background: "radial-gradient(circle, #10b981 0%, transparent 70%)",
            filter: "blur(60px)",
            borderRadius: "50%"
          }}
        />

        {/* Hero Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24"
          style={{ paddingTop: "80px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHeroLoaded ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Animated Tag */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div
              className="w-8 h-px"
              style={{ background: "#10b981" }}
              animate={{ scaleX: [0, 1] }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400 drop-shadow-lg">
              {slides[currentSlide].tag}
            </span>
          </motion.div>

          {/* Animated Titles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1
              className="font-black uppercase leading-none mb-2"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                color: "rgba(255,255,255,0.98)",
                letterSpacing: "-0.02em",
                textShadow: "0 10px 30px rgba(0,0,0,0.5)"
              }}
            >
              {slides[currentSlide].title}
            </h1>
            <h1
              className="font-black uppercase leading-none mb-8"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                background: "linear-gradient(135deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              {slides[currentSlide].highlight}
            </h1>
          </motion.div>

          {/* Subtitle with animation */}
          <motion.p
            className="text-white/70 mb-12 max-w-md text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ lineHeight: 1.8 }}
          >
            Kolkata's most trusted platform for premium turf bookings. Instant confirmation. Zero hassle. Pure play.
          </motion.p>

          {/* Animated CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate("/turfs")}
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold uppercase tracking-wider rounded-lg overflow-hidden relative"
              whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(16,185,129,0.6)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              <span className="relative z-10">Book Your Game</span>
              <motion.span
                className="relative z-10 transition-transform duration-200"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              onClick={() => navigate("/register")}
              className="px-8 py-4 border-2 border-white/40 text-white font-bold uppercase tracking-wider rounded-lg backdrop-blur-sm hover:border-emerald-400 hover:text-emerald-300 transition-all duration-300"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Join Free
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Animated Slide Indicators */}
        <motion.div
          className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentSlide ? "bg-emerald-500" : "bg-white/30"
              }`}
              style={{
                width: i === currentSlide ? "3px" : "2px",
                height: i === currentSlide ? "40px" : "16px",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Mobile Dots */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentSlide ? "24px" : "8px",
                height: "3px",
                background: i === currentSlide ? "#10b981" : "rgba(255,255,255,0.4)",
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>

        {/* Slider Arrows with hover glow */}
        <motion.button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg backdrop-blur-md border border-white/20 hover:border-emerald-400 hover:bg-emerald-500/30 transition-all duration-300"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(16,185,129,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          ‹
        </motion.button>

        <motion.button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white text-xl rounded-lg backdrop-blur-md border border-white/20 hover:border-emerald-400 hover:bg-emerald-500/30 transition-all duration-300"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(16,185,129,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          ›
        </motion.button>
      </motion.div>

      {/* STATS BAR - ANIMATED */}
      <motion.div
        className="relative py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-emerald-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
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
                <motion.div
                  className="font-black text-emerald-400"
                  style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                >
                  {s.number}
                </motion.div>
                <div className="text-slate-300 font-semibold text-sm mt-3 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* HOW IT WORKS - ENHANCED */}
      <div className="bg-slate-900 py-24 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-20 text-center">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1 }}
                />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Simple Process</span>
                <motion.div
                  className="w-12 h-px bg-gradient-to-l from-emerald-500 to-emerald-400"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
              <h2 className="font-black uppercase leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
                HOW IT <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">WORKS</span>
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
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`relative p-8 rounded-2xl transition-all duration-300 ${
                    s.featured
                      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl"
                      : "bg-slate-800/50 backdrop-blur-md border border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-500/20"
                  }`}
                >
                  {/* Glow effect for featured */}
                  {s.featured && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-emerald-600/0 opacity-0 group-hover:opacity-100"
                      animate={{ boxShadow: ["0 0 20px rgba(16,185,129,0)", "0 0 40px rgba(16,185,129,0.5)", "0 0 20px rgba(16,185,129,0)"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}

                  <motion.div
                    className="font-black mb-6"
                    style={{
                      fontSize: "3.5rem",
                      color: s.featured ? "rgba(255,255,255,0.2)" : "rgba(16,185,129,0.15)",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ delay: i * 0.2, duration: 3, repeat: Infinity }}
                  >
                    {s.icon}
                  </motion.div>

                  <div className="text-4xl mb-6 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{s.emoji}</div>
                  <h3 className={`text-xl font-bold uppercase mb-4 ${s.featured ? "text-white" : "text-slate-100"}`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-8 ${s.featured ? "text-white/85" : "text-slate-300"}`}>
                    {s.desc}
                  </p>

                  <AnimatedButton
                    onClick={() => navigate(s.action)}
                    variant={s.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {s.btn} →
                  </AnimatedButton>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* FACILITIES - GLASSMORPHISM */}
      <div className="bg-slate-950 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">World Class</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
              OUR <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">FACILITIES</span>
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
                <GlassCard className="p-6 h-full">
                  <motion.div
                    className="w-14 h-14 flex items-center justify-center text-3xl mb-4 rounded-lg bg-emerald-500/20 border border-emerald-400/30"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {f.icon}
                  </motion.div>
                  <h3 className="font-bold text-slate-100 mb-2 text-lg">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300">{f.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* TESTIMONIALS - PREMIUM CARDS */}
      <div className="bg-slate-900 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Player Stories</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
              WHAT PLAYERS <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">SAY</span>
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
                <GlassCard className="p-8">
                  {/* Star Rating */}
                  <motion.div
                    className="flex gap-1 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <motion.span
                        key={j}
                        className="text-emerald-400 text-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ delay: i * 0.1 + j * 0.05, duration: 1.5, repeat: Infinity }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>

                  <p className="text-sm leading-relaxed mb-6 text-slate-200">"{t.text}"</p>

                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 flex items-center justify-center font-bold text-sm flex-shrink-0 bg-gradient-to-br from-emerald-400 to-emerald-500 text-slate-900 rounded-full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {t.avatar}
                    </motion.div>
                    <div>
                      <p className="font-semibold text-slate-100 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SELECT GAMES - INTERACTIVE */}
      <div className="bg-slate-950 py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal className="mb-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Choose Your Sport</span>
              <motion.div
                className="w-12 h-px bg-gradient-to-l from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
              SELECT <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">YOUR GAME</span>
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
                className="group relative p-6 rounded-xl backdrop-blur-md bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-500/20 cursor-pointer text-center transition-all duration-300"
                whileHover={{
                  y: -12,
                  scale: 1.05,
                  borderColor: "rgba(16,185,129,0.6)",
                  boxShadow: "0 0 30px rgba(16,185,129,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ delay: i * 0.1, duration: 3, repeat: Infinity }}
                >
                  {game.icon}
                </motion.div>
                <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">{game.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* GALLERY - IMAGE REVEAL */}
      <div className="bg-slate-900 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Visual Tour</span>
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
              OUR <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">GALLERY</span>
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
                className="group relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "1/0.75" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-bold text-white text-lg drop-shadow-lg">{item.title}</h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CONTACT INFORMATION - ANIMATED */}
      <div className="bg-slate-950 py-24 px-6 relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal className="mb-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Get In Touch</span>
              <motion.div
                className="w-12 h-px bg-gradient-to-l from-emerald-500 to-emerald-400"
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1 }}
              />
            </div>
            <h2 className="font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#f1f5f9" }}>
              CONTACT <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">INFORMATION</span>
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
              { icon: "📍", label: "Address", value: "Kolkata, West Bengal, India", link: "" },
              { icon: "📞", label: "Phone", value: "+91 98765 43210", link: "tel:+919876543210" },
              { icon: "✉️", label: "Email", value: "info@turfarena.com", link: "mailto:info@turfarena.com" },
            ].map((c, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                component="a"
                href={c.link}
                className="no-underline"
              >
                <GlassCard className="p-8 text-center h-full hover:border-emerald-400/60">
                  <motion.div
                    className="w-14 h-14 flex items-center justify-center text-3xl mx-auto mb-4 rounded-lg bg-emerald-500/20 border border-emerald-400/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: i * 0.1, duration: 2, repeat: Infinity }}
                  >
                    {c.icon}
                  </motion.div>
                  <h3 className="font-bold text-slate-100 mb-2 text-lg">{c.label}</h3>
                  <p className="text-sm text-slate-300 break-words">{c.value}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA SECTION - ANIMATED BACKGROUND TEXT */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 py-32 px-6">
        {/* Animated background text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="font-black uppercase"
            style={{
              fontSize: "clamp(6rem, 20vw, 16rem)",
              letterSpacing: "-0.05em",
              color: "#10b981",
            }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            PLAY
          </motion.span>
        </motion.div>

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-emerald-500 to-emerald-400"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1 }}
                />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-400">Limited Slots Available</span>
                <motion.div
                  className="w-12 h-px bg-gradient-to-l from-emerald-500 to-emerald-400"
                  animate={{ scaleX: [0, 1] }}
                  transition={{ duration: 1 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-black uppercase mb-4" style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)", color: "#f1f5f9", lineHeight: 1, letterSpacing: "-0.01em" }}>
                  READY TO<br /><span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">PLAY?</span>
                </h2>
                <p className="mb-10 max-w-lg mx-auto text-slate-300 text-lg leading-relaxed">
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
                <AnimatedButton
                  onClick={() => navigate("/turfs")}
                  variant="primary"
                  className="px-10 py-4 text-base"
                >
                  BOOK NOW →
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => navigate("/register")}
                  variant="secondary"
                  className="px-10 py-4 text-base"
                >
                  CREATE ACCOUNT
                </AnimatedButton>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* FOOTER - DARK THEME WITH ANIMATIONS */}
      <motion.div
        className="bg-gradient-to-b from-slate-900 to-slate-950 py-16 px-6 border-t border-emerald-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/50"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand */}
            <motion.div variants={itemVariants}>
              <motion.div className="flex items-center gap-2 mb-3 w-fit" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="w-7 h-7 flex items-center justify-center font-semibold text-sm bg-emerald-500 text-white rounded-md"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  T
                </motion.div>
                <span className="font-black text-white text-xl">TurfArena</span>
              </motion.div>
              <p className="text-xs tracking-widest uppercase text-slate-400">Train · Play · Repeat</p>
              <p className="text-xs mt-3 text-slate-400 leading-relaxed">
                Kolkata's premier turf booking platform for all sports lovers.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { label: "Home", path: "/" },
                  { label: "Turfs", path: "/turfs" },
                  { label: "Book Your Games", path: "/turfs" },
                  { label: "Register", path: "/register" },
                ].map((l, idx) => (
                  <motion.button
                    key={l.path}
                    onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block text-slate-400 bg-transparent border-none cursor-pointer text-left"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ duration: 0.3 }}
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Support</h4>
              <div className="space-y-3">
                {[
                  { label: "Contact Us", path: "#" },
                  { label: "FAQ", path: "#" },
                  { label: "Support", path: "#" },
                  { label: "Feedback", path: "#" },
                ].map((l) => (
                  <motion.button
                    key={l.label}
                    onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block text-slate-400 bg-transparent border-none cursor-pointer text-left"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ duration: 0.3 }}
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Legal</h4>
              <div className="space-y-3">
                {[
                  { label: "Privacy Policy", path: "#" },
                  { label: "Terms of Service", path: "#" },
                  { label: "Cookie Policy", path: "#" },
                  { label: "Cancellation Policy", path: "#" },
                ].map((l) => (
                  <motion.button
                    key={l.label}
                    onClick={() => navigate(l.path)}
                    className="text-xs transition-colors duration-200 block text-slate-400 bg-transparent border-none cursor-pointer text-left"
                    whileHover={{ x: 5, color: "#10b981" }}
                    transition={{ duration: 0.3 }}
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xs text-slate-500">© 2025 TurfArena. All rights reserved.</p>
            <div className="flex gap-6">
              {["Facebook", "Instagram", "Twitter"].map((social) => (
                <motion.button
                  key={social}
                  className="text-xs font-semibold text-slate-400 bg-transparent border-none cursor-pointer"
                  whileHover={{
                    scale: 1.2,
                    color: "#10b981",
                    textShadow: "0 0 10px rgba(16,185,129,0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {social}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}

export default Home;
