import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#211b36", cream: "#f8f7fc" } } },
  plugins: [],
};
export default config;
