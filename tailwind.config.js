/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-radix-colors")({
      aliases: {
        cyan: "primary",
        slate: "neutral",
      },
    }),
  ],
}
