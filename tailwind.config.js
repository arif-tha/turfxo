/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Responsive typography using clamp
        "xs": "clamp(0.65rem, 1vw, 0.75rem)",
        "sm": "clamp(0.8rem, 1.2vw, 0.875rem)",
        "base": "clamp(0.95rem, 1.5vw, 1rem)",
        "lg": "clamp(1.05rem, 1.8vw, 1.125rem)",
        "xl": "clamp(1.2rem, 2vw, 1.25rem)",
        "2xl": "clamp(1.4rem, 2.5vw, 1.5rem)",
        "3xl": "clamp(1.8rem, 3.5vw, 1.875rem)",
        "4xl": "clamp(2.2rem, 5vw, 2.25rem)",
        "5xl": "clamp(2.6rem, 6vw, 3rem)",
        "6xl": "clamp(3rem, 7vw, 3.75rem)",
        "7xl": "clamp(3.5rem, 8vw, 4.5rem)",
        "8xl": "clamp(4rem, 9vw, 6rem)",
        "9xl": "clamp(4.5rem, 12vw, 8rem)",
      },
      spacing: {
        "clamp-xs": "clamp(0.25rem, 2vw, 0.5rem)",
        "clamp-sm": "clamp(0.5rem, 3vw, 1rem)",
        "clamp-md": "clamp(1rem, 4vw, 1.5rem)",
        "clamp-lg": "clamp(1.5rem, 5vw, 2rem)",
        "clamp-xl": "clamp(2rem, 6vw, 3rem)",
        "clamp-2xl": "clamp(2.5rem, 8vw, 4rem)",
      },
      width: {
        "container-sm": "clamp(100%, 90vw, 640px)",
        "container-md": "clamp(100%, 90vw, 768px)",
        "container-lg": "clamp(100%, 92vw, 1024px)",
        "container-xl": "clamp(100%, 92vw, 1280px)",
        "container-2xl": "clamp(100%, 94vw, 1536px)",
      },
      maxWidth: {
        "container-sm": "clamp(320px, 90vw, 640px)",
        "container-md": "clamp(320px, 90vw, 768px)",
        "container-lg": "clamp(320px, 92vw, 1024px)",
        "container-xl": "clamp(320px, 92vw, 1280px)",
        "container-2xl": "clamp(320px, 94vw, 1536px)",
      },
      padding: {
        "responsive-xs": "clamp(0.5rem, 2vw, 1rem)",
        "responsive-sm": "clamp(1rem, 3vw, 1.5rem)",
        "responsive-md": "clamp(1.5rem, 4vw, 2rem)",
        "responsive-lg": "clamp(2rem, 5vw, 3rem)",
        "responsive-xl": "clamp(2.5rem, 6vw, 4rem)",
      },
      borderRadius: {
        "responsive": "clamp(0.25rem, 1vw, 0.5rem)",
      },
      screens: {
        "xs": "320px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
}
