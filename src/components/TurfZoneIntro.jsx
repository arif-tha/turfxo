import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* COLORS */
const neon = "#00ff88";

/* PHASE CONTROL (FASTER) */
function usePhaseSequence() {
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("running"), 200),
      setTimeout(() => setPhase("kick"), 1200),
      setTimeout(() => setPhase("impact"), 2200),
      setTimeout(() => setPhase("reveal"), 2600),
      setTimeout(() => setPhase("home"), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return phase;
}

/* ROOT */
export default function TurfZoneIntro() {
  const phase = usePhaseSequence();

  return (
    <div style={{ height: "100vh", overflow: "hidden", background: "#000" }}>
      <AnimatePresence>
        {phase !== "home" && <IntroScreen phase={phase} />}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "home" && <Home />}
      </AnimatePresence>
    </div>
  );
}

/* TEXT OVERLAY */
function OverlayText({ phase }) {
  const style = {
    position: "absolute",
    top: "15%",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    textAlign: "center",
    zIndex: 50,
  };

  return (
    <AnimatePresence mode="wait">
      {phase === "intro" && (
        <motion.div {...fade} style={style}>
          <h2>Weekend Match?</h2>
          <p style={{ opacity: 0.6 }}>All turfs booked 😓</p>
        </motion.div>
      )}

      {phase === "running" && (
        <motion.div {...fade} style={style}>
          <h2 style={{ color: neon }}>Not anymore ⚡</h2>
        </motion.div>
      )}

      {phase === "kick" && (
        <motion.div {...fade} style={style}>
          <h2>Find & Book Instantly</h2>
        </motion.div>
      )}

      {phase === "reveal" && (
        <motion.div {...fade} style={style}>
          <h2 style={{ color: neon }}>Book in 10 seconds</h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

/* INTRO SCREEN */
function IntroScreen({ phase }) {
  const showBall = phase !== "intro";
  const ballEnd = phase === "impact" || phase === "reveal";

  useEffect(() => {
    if (phase === "kick") {
      const audio = new Audio("/kick.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, [phase]);

  return (
    <motion.div
      style={{ position: "absolute", inset: 0 }}
      exit={{ opacity: 0 }}
    >
      {/* SKIP BUTTON */}
      <button
        onClick={() => window.location.reload()}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          border: "none",
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        Skip →
      </button>

      {/* TEXT */}
      <OverlayText phase={phase} />

      {/* BALL */}
      {showBall && (
        <motion.div
          style={{
            position: "absolute",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#fff",
            left: "20%",
            top: "50%",
          }}
          animate={{
            left: ballEnd ? "60%" : "20%",
            top: ballEnd ? "55%" : "50%",
          }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* PLAYER */}
      <motion.div
        style={{
          position: "absolute",
          left: "10%",
          bottom: "40%",
          color: "#fff",
        }}
        animate={phase === "kick" ? { scale: [1, 1.2, 1] } : {}}
      >
        ⚽ Player
      </motion.div>

      {/* IMPACT */}
      {phase === "impact" && (
        <div
          style={{
            position: "absolute",
            left: "60%",
            top: "55%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "radial-gradient(circle, #00ff88, transparent)",
          }}
        />
      )}

      {/* LOGO */}
      {phase === "reveal" && (
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
          }}
        >
          <span style={{ color: neon }}>TURF</span>ZONE
        </motion.h1>
      )}
    </motion.div>
  );
}

/* HOME PAGE */
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
      <h1>
        Your Perfect <span style={{ color: neon }}>Pitch</span>
      </h1>

      <p>Book turfs instantly ⚡</p>

      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: neon,
          border: "none",
          cursor: "pointer",
        }}
      >
        Book Now
      </button>

      {/* LIVE FEEL */}
      <motion.div
        style={{ marginTop: 20, color: neon }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        🔴 3 people booking right now
      </motion.div>
    </motion.div>
  );
}