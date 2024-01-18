/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      "oxford-blue": "#01172F",
      "dark-green": "#00635D",
      "dark-green-light": "#008F85",
      moonstone: "#08A4BD",
    },
  },
};
export const plugins = [];
