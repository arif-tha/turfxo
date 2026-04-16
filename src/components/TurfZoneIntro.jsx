import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const neon = "#00ff88";

/* BETTER TIMING (VISIBLE + NOT BORING) */
function usePhaseSequence() {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("running"), 400),
      setTimeout(() => setPhase("kick"), 1600),
      setTimeout(() => setPhase("impact"), 2800),
      setTimeout(() => setPhase("reveal"), 3400),
      setTimeout(() => setPhase("home"), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return phase;
}

export default function TurfZoneIntro() {
  const phase = usePhaseSequence();

  return (
    <div style={{ height: "100vh", background: "#000", overflow: "hidden" }}>
      <AnimatePresence>
        {phase !== "home" && <IntroScreen phase={phase} />}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "home" && <Home />}
      </AnimatePresence>
    </div>
  );
}

/* BIG TEXT OVERLAY */
function OverlayText({ phase }) {
  const style = {
    position: "absolute",
    top: "12%",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    textAlign: "center",
    zIndex: 50,
  };

  const textStyle = {
    fontSize: "clamp(28px, 6vw, 60px)",
    fontWeight: "bold",
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" && (
        <motion.div {...fade} style={style}>
          <h2 style={textStyle}>Weekend Match?</h2>
          <p style={{ fontSize: 18, opacity: 0.7 }}>
            All turfs booked 😓
          </p>
        </motion.div>
      )}

      {phase === "running" && (
        <motion.div {...fade} style={style}>
          <h2 style={{ ...textStyle, color: neon }}>Not anymore ⚡</h2>
        </motion.div>
      )}

      {phase === "kick" && (
        <motion.div {...fade} style={style}>
          <h2 style={textStyle}>Find & Book Instantly</h2>
        </motion.div>
      )}

      {phase === "reveal" && (
        <motion.div {...fade} style={style}>
          <h2 style={{ ...textStyle, color: neon }}>
            Book in 10 seconds
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fade = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -40 },
  transition: { duration: 0.5 },
};

/* INTRO SCREEN */
function IntroScreen({ phase }) {
  const ballEnd = phase === "impact" || phase === "reveal";

  return (
    <motion.div style={{ position: "absolute", inset: 0 }}>
      {/* SKIP */}
      <button
        onClick={() => window.location.reload()}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
          fontSize: 14,
          padding: "8px 14px",
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          border: "none",
        }}
      >
        Skip →
      </button>

      <OverlayText phase={phase} />

      {/* BIG BALL */}
      <motion.div
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#fff",
          left: "20%",
          top: "50%",
          boxShadow: "0 0 20px #00ff88",
        }}
        animate={{
          left: ballEnd ? "65%" : "20%",
          top: ballEnd ? "55%" : "50%",
        }}
        transition={{ duration: 1 }}
      />

      {/* PLAYER (BIG) */}
      <motion.div
        style={{
          position: "absolute",
          left: "10%",
          bottom: "35%",
          fontSize: 40,
        }}
        animate={phase === "kick" ? { scale: [1, 1.3, 1] } : {}}
      >
        ⚽
      </motion.div>

      {/* IMPACT */}
      {phase === "impact" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.8 }}
          style={{
            position: "absolute",
            left: "65%",
            top: "55%",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, #00ff88, transparent)",
          }}
        />
      )}

      {/* LOGO BIG */}
      {phase === "reveal" && (
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(40px, 8vw, 90px)",
            fontWeight: "900",
          }}
        >
          <span style={{ color: neon }}>TURF</span>
          <span style={{ color: "#fff" }}>ZONE</span>
        </motion.h1>
      )}
    </motion.div>
  );
}

/* HOME */
function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        height: "100%",
        background: "#0a1a0a",
        color: "#fff",
        textAlign: "center",
        paddingTop: 100,
      }}
    >
      <h1 style={{ fontSize: "clamp(32px,6vw,70px)" }}>
        Your Perfect <span style={{ color: neon }}>Pitch</span>
      </h1>

      <p style={{ fontSize: 18 }}>Book turfs instantly ⚡</p>

      <button
        style={{
          marginTop: 20,
          padding: "14px 30px",
          fontSize: 18,
          background: neon,
          border: "none",
          cursor: "pointer",
        }}
      >
        Book Now
      </button>

      <motion.div
        style={{ marginTop: 20, color: neon, fontSize: 16 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🔴 3 people booking right now
      </motion.div>
    </motion.div>
  );
}