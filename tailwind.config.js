/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Light Theme
        "premium-bg": "#F8F9FB",
        "premium-text": "#111827",
        "premium-accent": "#22C55E",
        "premium-secondary": "#F3F4F6",
        "premium-border": "#E5E7EB",
        "premium-dark": "#1F2937",
        
        // Accent variations
        "accent-light": "#DCFCE7",
        "accent-hover": "#16A34A",
      },
      fontFamily: {
        "sans": ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        "xs": ["12px", { lineHeight: "16px" }],
        "sm": ["14px", { lineHeight: "20px" }],
        "base": ["16px", { lineHeight: "24px" }],
        "lg": ["18px", { lineHeight: "28px" }],
        "xl": ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "36px" }],
        "4xl": ["36px", { lineHeight: "40px" }],
        "5xl": ["48px", { lineHeight: "52px" }],
        "6xl": ["60px", { lineHeight: "68px" }],
        "7xl": ["72px", { lineHeight: "80px" }],
      },
      borderRadius: {
        "2xs": "4px",
        "xs": "8px",
        "sm": "12px",
        "md": "16px",
        "lg": "20px",
        "xl": "24px",
        "2xl": "28px",
      },
      boxShadow: {
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "sm": "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.08)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.08)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
        "glow": "0 0 20px rgba(34, 197, 94, 0.15)",
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
