/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0616",
        plum: "#1A0B2E",
        royal: "#240046",
        neon: "#E61E75",
        magenta: "#FF4D95",
        glow: "#6C17A1",
        ember: "#FF6A5C",
      },
      boxShadow: {
        glow: "0 0 40px rgba(230, 30, 117, 0.35)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0B0616, #1A0B2E, #6C17A1)",
        "button-gradient": "linear-gradient(90deg, #E61E75, #FF4D95)",
        "accent-gradient": "linear-gradient(90deg, #FF4D95, #FF6A5C)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
      },
    },
  },
  plugins: [],
};
