/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aris-cobalt': '#082E4A',
        'aris-teal': '#065056',
        'aris-graphite': '#2A3B42',
        'aris-black': '#0C1114',
        'aris-steel': '#3A4042',
        'aris-mint': '#80ADAD',
        'aris-sky': '#B2CBD8',
        'aris-nickel': '#8A9294',
        'aris-clay': '#F0EFEA',
        'aris-white': '#F7F8F9',
        'aris-aluminium': '#E8EAEB',
      },
      fontFamily: {
        sans: ['Host Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
