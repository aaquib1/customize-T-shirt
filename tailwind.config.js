/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#15130F",
        cream: "#FAF6EF",
        paper: "#FFFFFF",
        sage: {
          DEFAULT: "#2F6B4F",
          light: "#E3EEE7",
          dark: "#1F4D38",
        },
        lilac: "#CFC6F2",
        coral: "#F2A36B",
        line: "#E8E1D3",
        muted: "#8B8579",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        premium: "0 30px 60px -25px rgba(21,19,15,0.25)",
        card: "0 12px 30px -15px rgba(21,19,15,0.18)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
