/**
 * TurfZone — Premium Turf Booking Platform
 * Opening Animation Component
 *
 * Dependencies:
 *   npm install framer-motion
 *
 * Usage:
 *   import TurfZoneIntro from './TurfZoneIntro';
 *   <TurfZoneIntro />
 *
 * The component renders a full-screen intro animation, then fades
 * into the main homepage. All timing is driven by Framer Motion.
 */

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const T = {
  black: "#000000",
  darkGreen: "#051505",
  midGreen: "#0a2a0a",
  grass1: "#0a1f0a",
  grass2: "#0d2610",
  neon: "#00ff88",
  neonDim: "rgba(0,255,136,0.15)",
  neonGlow: "rgba(0,255,136,0.4)",
  neonSoft: "rgba(0,255,136,0.08)",
  white: "#ffffff",
  whiteDim: "rgba(255,255,255,0.6)",
  whiteGhost: "rgba(255,255,255,0.08)",
  orange: "#e05000",
  orangeDark: "#c03000",
  skin: "#f4a070",
  denim: "#1a3a6a",
  boot: "#111111",
  bootAccent: "#e05000",
  danger: "#ff4444",
  dangerSoft: "rgba(255,68,68,0.1)",
  dangerBorder: "rgba(255,68,68,0.3)",
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected once)
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tz-root {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #000;
    font-family: 'Barlow', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  @keyframes tz-grassPulse {
    0%,100% { opacity:0.7; } 50% { opacity:1; }
  }
  @keyframes tz-stadiumBlink {
    0%,100% { opacity:0.7; } 50% { opacity:1; }
  }
  @keyframes tz-ballSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(720deg); }
  }
  @keyframes tz-glowPulse {
    0%,100% { box-shadow: 0 0 20px #00ff88, 0 0 40px rgba(0,255,136,.3); }
    50%      { box-shadow: 0 0 40px #00ff88, 0 0 80px rgba(0,255,136,.5); }
  }
  @keyframes tz-ripple {
    0%   { transform: scale(0); opacity:1; }
    100% { transform: scale(6); opacity:0; }
  }
  @keyframes tz-shockwave {
    0%   { transform: scale(0); opacity:0.8; }
    100% { transform: scale(5); opacity:0; }
  }
  @keyframes tz-particleBurst {
    0%   { opacity:1; transform: translateY(0) scale(1); }
    100% { opacity:0; transform: translateY(-110px) scale(0.4); }
  }
  @keyframes tz-logoReveal {
    0%   { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0% 0 0); }
  }
  @keyframes tz-shake {
    0%  { transform: translate(0,0); }
    10% { transform: translate(-9px,5px); }
    20% { transform: translate(9px,-5px); }
    30% { transform: translate(-7px,7px); }
    40% { transform: translate(7px,-3px); }
    50% { transform: translate(-5px,5px); }
    60% { transform: translate(5px,-5px); }
    70% { transform: translate(-3px,3px); }
    80% { transform: translate(3px,-3px); }
    100%{ transform: translate(0,0); }
  }
  @keyframes tz-legSwing {
    0%,100% { transform: rotate(-22deg); }
    50%      { transform: rotate(22deg); }
  }
  @keyframes tz-armSwing {
    0%,100% { transform: rotate(18deg); }
    50%      { transform: rotate(-18deg); }
  }
  @keyframes tz-kickLeg {
    0%   { transform: rotate(-12deg); }
    35%  { transform: rotate(-55deg); }
    60%  { transform: rotate(70deg); }
    100% { transform: rotate(-12deg); }
  }
  @keyframes tz-scanline {
    from { top: -2px; } to { top: 100%; }
  }
  @keyframes tz-trailFade {
    0%   { opacity:0.7; transform:scale(1); }
    100% { opacity:0; transform:scale(0.2); }
  }
  @keyframes tz-navSlide {
    from { transform:translateY(-60px); opacity:0; }
    to   { transform:translateY(0); opacity:1; }
  }
  @keyframes tz-heroUp {
    from { transform:translateY(28px); opacity:0; }
    to   { transform:translateY(0); opacity:1; }
  }
  @keyframes tz-cardIn {
    from { transform:translateY(36px) scale(0.96); opacity:0; }
    to   { transform:translateY(0) scale(1); opacity:1; }
  }
  @keyframes tz-fadeScale {
    from { opacity:0; transform:scale(1.06); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes tz-countUp {
    from { opacity:0; transform:scale(0.7); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes tz-float {
    from { transform:translateY(18px); opacity:0; }
    to   { transform:translateY(0); opacity:1; }
  }

  .tz-shake { animation: tz-shake 0.55s ease-out; }
`;

function InjectGlobalStyles() {
  useEffect(() => {
    if (document.getElementById("tz-global-styles")) return;
    const style = document.createElement("style");
    style.id = "tz-global-styles";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return null;
}

/* ─────────────────────────────────────────────
   PHASE SEQUENCER
   intro → running → kick → impact → reveal → home
───────────────────────────────────────────── */
const PHASES = ["intro", "running", "kick", "impact", "reveal", "home"];

function usePhaseSequence() {
  const [phase, setPhase] = useState("intro");
  const phaseRef = useRef("intro");

  const advance = (next) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useEffect(() => {
    const timers = [
      setTimeout(() => advance("running"), 300),
      setTimeout(() => advance("kick"), 1500),
      setTimeout(() => advance("impact"), 2700),
      setTimeout(() => advance("reveal"), 3050),
      setTimeout(() => advance("home"), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return phase;
}

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function TurfZoneIntro() {
  const phase = usePhaseSequence();

  return (
    <>
      <InjectGlobalStyles />
      <div className="tz-root" style={{ position: "relative" }}>
        <AnimatePresence>
          {phase !== "home" && <IntroScreen key="intro" phase={phase} />}
        </AnimatePresence>
        <AnimatePresence>
          {phase === "home" && <HomePage key="home" />}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   INTRO SCREEN
───────────────────────────────────────────── */
function IntroScreen({ phase }) {
  const isRunning = ["running", "kick"].includes(phase);
  const isKick = phase === "kick";
  const showBall = ["kick", "impact", "reveal"].includes(phase);
  const ballLanded = ["impact", "reveal"].includes(phase);
  const showImpact = ["impact", "reveal"].includes(phase);
  const showLogo = phase === "reveal";
  const shaking = phase === "impact";

  /* Ball position via framer-motion layout animation */
  const ballX = ballLanded ? "calc(58% - 19px)" : "calc(22% + 36px)";
  const ballY = ballLanded ? "calc(52% - 19px)" : "calc(48% - 19px)";

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        overflow: "hidden",
      }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: "easeIn" } }}
    >
      {/* Camera shake wrapper */}
      <div
        className={shaking ? "tz-shake" : ""}
        style={{ position: "absolute", inset: 0 }}
      >
        <StadiumBackground phase={phase} />
        <GrassField />

        {/* Ball trails */}
        {showBall && !ballLanded && <BallTrails />}

        {/* The ball */}
        {showBall && (
          <motion.div
            style={{
              position: "absolute",
              width: 38,
              height: 38,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 33% 33%, #ffffff 0%, #e0e0e0 45%, #888888 100%)",
              border: "2px solid #555",
              zIndex: 20,
              boxShadow: ballLanded
                ? "0 0 24px #00ff88, 0 0 48px rgba(0,255,136,.4)"
                : "0 0 14px rgba(0,255,136,.5), 0 4px 12px rgba(0,0,0,.5)",
              animation: ballLanded
                ? "tz-glowPulse 0.9s ease-in-out infinite"
                : "tz-ballSpin 0.45s linear infinite",
            }}
            initial={{ left: "calc(22% + 36px)", top: "calc(48% - 19px)" }}
            animate={{ left: ballX, top: ballY }}
            transition={{
              duration: ballLanded ? 1.05 : 0,
              ease: [0.25, 0.8, 0.35, 1],
            }}
          >
            {/* Pentagon pattern */}
            <svg
              viewBox="0 0 38 38"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            >
              <polygon
                points="19,4 30,14 26,27 12,27 8,14"
                fill="none"
                stroke="#333"
                strokeWidth="1.5"
              />
              <polygon points="19,12 24,17 22,23 16,23 14,17" fill="#333" />
            </svg>
          </motion.div>
        )}

        {/* Player */}
        <PlayerFigure phase={phase} />

        {/* Impact FX */}
        {showImpact && <ImpactEffect />}

        {/* Logo */}
        {showLogo && <LogoReveal />}

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.7) 100%)",
            pointerEvents: "none",
            zIndex: 60,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STADIUM BACKGROUND
───────────────────────────────────────────── */
function StadiumBackground({ phase }) {
  const lit = phase !== "intro";
  const lightPositions = [12, 28, 50, 72, 88];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: lit
          ? "radial-gradient(ellipse at 50% 75%, #0a2a0a 0%, #051505 55%, #000 100%)"
          : "radial-gradient(ellipse at 50% 75%, #050505 0%, #000 100%)",
        transition: "background 1.2s ease",
      }}
    >
      {/* Floodlights */}
      {lightPositions.map((x, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: "7%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#ffffcc",
            boxShadow: "0 0 24px 10px rgba(255,255,200,.55)",
            animation: `tz-stadiumBlink ${1.3 + i * 0.25}s ease-in-out infinite`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      {/* Cone of light from each flood */}
      {lightPositions.map((x, i) => (
        <div
          key={`cone-${i}`}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: "7%",
            width: 120,
            height: "55%",
            marginLeft: -60,
            background:
              "linear-gradient(to bottom, rgba(255,255,200,.06) 0%, transparent 100%)",
            clipPath: "polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Field centre circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "56%",
          width: 210,
          height: 210,
          marginLeft: -105,
          marginTop: -105,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,.07)",
        }}
      />

      {/* Halfway line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "56%",
          height: 1.5,
          background: "rgba(255,255,255,.06)",
        }}
      />

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,.03) 3px, rgba(0,0,0,.03) 4px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   GRASS FIELD
───────────────────────────────────────────── */
function GrassField() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "45%",
        background: `repeating-linear-gradient(90deg, ${T.grass1} 0px, ${T.grass2} 44px, ${T.grass1} 88px)`,
        borderTop: "2px solid #1a5c1a",
        boxShadow: "0 -6px 50px rgba(0,255,136,.15)",
      }}
    >
      {/* White marking line */}
      <div
        style={{
          position: "absolute",
          left: "28%",
          right: "18%",
          top: 0,
          height: 1.5,
          background: "rgba(255,255,255,.14)",
        }}
      />
      {/* Subtle grass texture lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${i * 8.5}%`,
            top: 0,
            bottom: 0,
            width: 1,
            background: "rgba(255,255,255,.015)",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BALL TRAILS
───────────────────────────────────────────── */
function BallTrails() {
  const trails = [
    { left: "calc(19% + 16px)", top: "calc(48% - 8px)", size: 30 },
    { left: "calc(26% + 16px)", top: "calc(47% - 6px)", size: 22 },
    { left: "calc(33% + 16px)", top: "calc(46% - 4px)", size: 15 },
    { left: "calc(40% + 16px)", top: "calc(48% - 6px)", size: 9 },
  ];
  return (
    <>
      {trails.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: t.left,
            top: t.top,
            width: t.size,
            height: t.size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,255,136,.7) 0%, transparent 70%)",
            animation: `tz-trailFade 0.35s ease-out ${i * 0.04}s forwards`,
            zIndex: 19,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   PLAYER FIGURE (SVG)
───────────────────────────────────────────── */
function PlayerFigure({ phase }) {
  const running = ["running", "kick"].includes(phase);
  const kicking = phase === "kick";

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "13%",
        bottom: "44%",
        translateY: "50%",
        width: 64,
        zIndex: 15,
        filter: "drop-shadow(0 10px 30px rgba(0,255,136,.35))",
      }}
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 64 140"
        width={64}
        height={140}
        style={{ overflow: "visible" }}
      >
        {/* Ground shadow */}
        <ellipse cx="32" cy="138" rx="22" ry="5" fill="#000" opacity="0.55" />

        {/* === BACK LEG === */}
        <g
          style={{
            transformOrigin: "32px 95px",
            animation: kicking
              ? "none"
              : running
              ? "tz-legSwing 0.38s ease-in-out infinite alternate"
              : "none",
          }}
        >
          <rect x="16" y="95" width="12" height="38" rx="5" fill={T.denim} />
          <rect x="14" y="126" width="16" height="12" rx="4" fill={T.boot} />
        </g>

        {/* === KICK / FRONT LEG === */}
        <g
          style={{
            transformOrigin: "32px 92px",
            animation: kicking
              ? "tz-kickLeg 0.65s ease-in-out 1 forwards"
              : running
              ? "tz-legSwing 0.38s ease-in-out infinite alternate-reverse"
              : "none",
          }}
        >
          <rect x="34" y="95" width="12" height="38" rx="5" fill={T.denim} />
          <rect
            x="32"
            y="126"
            width="16"
            height="12"
            rx="4"
            fill={T.bootAccent}
          />
        </g>

        {/* === TORSO === */}
        <rect x="16" y="54" width="34" height="44" rx="7" fill={T.orange} />
        {/* Collar stripe */}
        <rect x="16" y="54" width="34" height="7" rx="7" fill={T.orangeDark} />
        {/* Jersey number */}
        <text
          x="33"
          y="86"
          textAnchor="middle"
          fill="#fff"
          fontSize="15"
          fontWeight="900"
          fontFamily="'Barlow Condensed', sans-serif"
        >
          7
        </text>

        {/* === LEFT ARM === */}
        <g
          style={{
            transformOrigin: "16px 62px",
            animation: running
              ? "tz-armSwing 0.38s ease-in-out infinite alternate"
              : "none",
          }}
        >
          <rect
            x="2"
            y="59"
            width="15"
            height="9"
            rx="4"
            fill={T.skin}
            transform="rotate(-18, 16, 62)"
          />
        </g>

        {/* === RIGHT ARM === */}
        <g
          style={{
            transformOrigin: "50px 62px",
            animation: running
              ? "tz-armSwing 0.38s ease-in-out infinite alternate-reverse"
              : "none",
          }}
        >
          <rect
            x="49"
            y="59"
            width="15"
            height="9"
            rx="4"
            fill={T.skin}
            transform="rotate(18, 50, 62)"
          />
        </g>

        {/* === HEAD === */}
        <circle cx="32" cy="38" r="19" fill={T.skin} />
        {/* Hair */}
        <ellipse cx="32" cy="23" rx="19" ry="11" fill="#1a0a00" />
        {/* Eyes */}
        <circle cx="25" cy="39" r="3.5" fill="#fff" />
        <circle cx="38" cy="39" r="3.5" fill="#fff" />
        <circle cx="26" cy="39" r="1.8" fill="#1a0a00" />
        <circle cx="39" cy="39" r="1.8" fill="#1a0a00" />
        {/* Mouth (determined expression) */}
        <path
          d="M27 46 Q32 43 37 46"
          fill="none"
          stroke="#b06040"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Ear */}
        <circle cx="13" cy="39" r="4" fill={T.skin} />
        <circle cx="51" cy="39" r="4" fill={T.skin} />
      </svg>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   IMPACT EFFECTS
───────────────────────────────────────────── */
function ImpactEffect() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    angle: (i / 16) * 360,
    dist: 45 + Math.random() * 65,
    color: [T.neon, "#ffffff", "#ffcc00", "#00ccff"][i % 4],
    size: 5 + Math.random() * 9,
    dur: 0.45 + Math.random() * 0.45,
    delay: Math.random() * 0.12,
  }));

  return (
    <div
      style={{
        position: "absolute",
        left: "58%",
        top: "52%",
        transform: "translate(-50%, -50%)",
        zIndex: 35,
      }}
    >
      {/* Ripple rings */}
      {[0, 0.12, 0.25].map((delay, i) => (
        <div
          key={`ripple-${i}`}
          style={{
            position: "absolute",
            width: 90,
            height: 90,
            marginLeft: -45,
            marginTop: -45,
            borderRadius: "50%",
            border: `${i === 0 ? 4 : 2}px solid ${
              i === 0 ? T.neon : "rgba(255,255,255,.4)"
            }`,
            animation: `tz-ripple 0.85s ease-out ${delay}s forwards`,
          }}
        />
      ))}

      {/* Shockwave */}
      <div
        style={{
          position: "absolute",
          width: 110,
          height: 110,
          marginLeft: -55,
          marginTop: -55,
          borderRadius: "50%",
          border: "5px solid rgba(0,255,136,.6)",
          animation: "tz-shockwave 1s ease-out forwards",
        }}
      />

      {/* Flash bloom */}
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 140,
          marginLeft: -70,
          marginTop: -70,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,136,.55) 0%, transparent 70%)",
          animation: "tz-ripple 0.65s ease-out forwards",
        }}
      />

      {/* Particle burst */}
      {particles.map((p, i) => (
        <div
          key={`p-${i}`}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            left: 0,
            top: 0,
            boxShadow: `0 0 8px ${p.color}`,
            animation: `tz-particleBurst ${p.dur}s ease-out ${p.delay}s forwards`,
            transform: `rotate(${p.angle}deg) translateX(${p.dist}px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOGO REVEAL
───────────────────────────────────────────── */
function LogoReveal() {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "36%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        zIndex: 50,
      }}
    >
      {/* Icon badge */}
      <motion.div
        style={{
          width: 76,
          height: 76,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ff88 0%, #00cc66 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          boxShadow: "0 0 40px rgba(0,255,136,.7)",
        }}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <svg viewBox="0 0 44 44" width={44} height={44}>
          <circle cx="22" cy="22" r="17" fill="none" stroke="#fff" strokeWidth="2.5" />
          <polygon points="22,7 31,15 28,26 16,26 13,15" fill="#fff" />
          <circle cx="22" cy="22" r="5" fill="#00cc66" />
        </svg>
      </motion.div>

      {/* Brand name */}
      <motion.div
        style={{
          fontSize: "clamp(38px, 8vw, 68px)",
          fontWeight: 900,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: 6,
          lineHeight: 1,
          animation: "tz-logoReveal 0.7s ease-out 0.15s both",
        }}
      >
        <span style={{ color: T.neon }}>TURF</span>
        <span style={{ color: T.white }}>ZONE</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        style={{
          fontSize: 13,
          color: "rgba(0,255,136,.7)",
          letterSpacing: 7,
          marginTop: 10,
          textTransform: "uppercase",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          animation: "tz-float 0.55s ease-out 0.45s both",
          opacity: 0,
        }}
      >
        Book · Play · Dominate
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
const SLOTS = [
  {
    name: "Arena A — 5-a-side",
    time: "6:00 AM",
    price: "₹800/hr",
    status: "Available",
    tag: "Most Popular",
  },
  {
    name: "Arena B — 7-a-side",
    time: "7:00 AM",
    price: "₹950/hr",
    status: "Booked",
    tag: null,
  },
  {
    name: "Arena C — 11-a-side",
    time: "8:00 AM",
    price: "₹1,100/hr",
    status: "Available",
    tag: "Premium",
  },
];

const NAV_LINKS = ["Home", "Venues", "Schedule", "Leagues"];

function HomePage() {
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        overflowY: "auto",
        background: `linear-gradient(160deg, ${T.darkGreen} 0%, #0a1a0a 55%, ${T.black} 100%)`,
      }}
      initial={{ opacity: 0, scale: 1.06 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
    >
      <Nav />
      <Hero />
      <SlotGrid />
      <StatsBar />
    </motion.div>
  );
}

/* — Nav — */
function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 62,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        background: "rgba(0,0,0,.72)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,255,136,.12)",
        zIndex: 100,
        animation: "tz-navSlide 0.5s ease-out 0.2s both",
        opacity: 0,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00ff88, #00cc66)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg viewBox="0 0 22 22" width={20} height={20}>
            <circle cx="11" cy="11" r="9" fill="none" stroke="#fff" strokeWidth="1.8" />
            <polygon points="11,3 16,8 14,14 8,14 6,8" fill="#fff" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: 3,
          }}
        >
          <span style={{ color: T.neon }}>TURF</span>
          <span style={{ color: T.white }}>ZONE</span>
        </span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {NAV_LINKS.map((l) => (
          <span
            key={l}
            style={{
              color: T.whiteDim,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color .2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = T.neon)}
            onMouseLeave={(e) => (e.target.style.color = T.whiteDim)}
          >
            {l}
          </span>
        ))}
        <button
          style={{
            padding: "8px 22px",
            borderRadius: 6,
            background: T.neon,
            border: "none",
            color: T.black,
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,255,136,.4)",
            transition: "transform .15s, box-shadow .15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,136,.4)";
          }}
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}

/* — Hero — */
function Hero() {
  return (
    <section
      style={{
        paddingTop: 90,
        minHeight: "72vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "90px 40px 40px",
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: "inline-block",
          background: T.neonSoft,
          border: "1px solid rgba(0,255,136,.25)",
          borderRadius: 20,
          padding: "6px 18px",
          marginBottom: 28,
          fontSize: 11,
          color: T.neon,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontWeight: 700,
          animation: "tz-heroUp 0.5s ease-out 0.3s both",
          opacity: 0,
        }}
      >
        ⚡ Book in under 60 seconds
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(40px, 7vw, 86px)",
          fontWeight: 900,
          lineHeight: 1.05,
          marginBottom: 22,
          textTransform: "uppercase",
          letterSpacing: 2,
          animation: "tz-heroUp 0.55s ease-out 0.4s both",
          opacity: 0,
        }}
      >
        <span style={{ color: T.white }}>Your Perfect</span>
        <br />
        <span
          style={{
            color: T.neon,
            textShadow: "0 0 60px rgba(0,255,136,.35)",
          }}
        >
          Pitch Awaits
        </span>
      </h1>

      {/* Sub */}
      <p
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,.48)",
          maxWidth: 500,
          lineHeight: 1.75,
          marginBottom: 38,
          fontWeight: 400,
          animation: "tz-heroUp 0.55s ease-out 0.5s both",
          opacity: 0,
        }}
      >
        Reserve premium football turfs across the city. Real-time availability,
        instant confirmation, zero hassle.
      </p>

      {/* CTAs */}
      <div
        style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "tz-heroUp 0.55s ease-out 0.6s both",
          opacity: 0,
        }}
      >
        <button
          style={{
            padding: "15px 36px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #00ff88, #00cc66)",
            border: "none",
            color: T.black,
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: 1,
            cursor: "pointer",
            boxShadow: "0 0 32px rgba(0,255,136,.45)",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          Book a Turf →
        </button>
        <button
          style={{
            padding: "15px 36px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(255,255,255,.2)",
            color: T.white,
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            letterSpacing: 1,
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          Explore Venues
        </button>
      </div>
    </section>
  );
}

/* — Slot Cards — */
function SlotGrid() {
  return (
    <section
      style={{
        padding: "0 40px 60px",
        display: "flex",
        gap: 18,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {SLOTS.map((slot, i) => (
        <SlotCard key={slot.name} slot={slot} delay={0.7 + i * 0.1} />
      ))}
    </section>
  );
}

function SlotCard({ slot, delay }) {
  const available = slot.status === "Available";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(0,255,136,.07)"
          : "rgba(255,255,255,.04)",
        border: `1px solid ${hovered ? "rgba(0,255,136,.3)" : T.whiteGhost}`,
        borderLeft: `3px solid ${available ? T.neon : T.danger}`,
        borderRadius: 12,
        padding: "20px 26px",
        minWidth: 220,
        flex: "1 1 220px",
        maxWidth: 280,
        cursor: "pointer",
        transition: "background .25s, border .25s, transform .2s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        animation: `tz-cardIn 0.55s ease-out ${delay}s both`,
        opacity: 0,
      }}
    >
      {/* Tag */}
      {slot.tag && (
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: T.neon,
            background: T.neonSoft,
            border: "1px solid rgba(0,255,136,.2)",
            borderRadius: 4,
            padding: "2px 8px",
            display: "inline-block",
            marginBottom: 10,
          }}
        >
          {slot.tag}
        </div>
      )}

      <div
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,.38)",
          marginBottom: 6,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {slot.time}
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: T.white,
          marginBottom: 6,
          fontFamily: "'Barlow Condensed', sans-serif",
          letterSpacing: 1,
        }}
      >
        {slot.name}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 900,
          color: T.neon,
          marginBottom: 12,
          fontFamily: "'Barlow Condensed', sans-serif",
        }}
      >
        {slot.price}
      </div>
      <div
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          color: available ? T.neon : T.danger,
          background: available ? T.neonSoft : T.dangerSoft,
          border: `1px solid ${available ? "rgba(0,255,136,.25)" : T.dangerBorder}`,
          borderRadius: 4,
          padding: "3px 10px",
        }}
      >
        {slot.status}
      </div>
    </div>
  );
}

/* — Stats Bar — */
function StatsBar() {
  const stats = [
    { label: "Turfs Available", value: "48+" },
    { label: "Bookings Today", value: "312" },
    { label: "Cities", value: "12" },
    { label: "Happy Players", value: "50K+" },
  ];
  return (
    <div
      style={{
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        padding: "28px 40px",
        display: "flex",
        justifyContent: "center",
        gap: "clamp(24px, 5vw, 80px)",
        flexWrap: "wrap",
        background: "rgba(0,0,0,.3)",
        animation: "tz-heroUp 0.6s ease-out 1s both",
        opacity: 0,
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 900,
              color: T.neon,
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: 1,
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.38)",
              letterSpacing: 2,
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
