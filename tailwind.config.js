/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Include all files in the pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the components directory
    './app/**/*.{js,ts,jsx,tsx}', // For the new Next.js App Router structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
