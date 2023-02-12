/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#1e1e23',
        'secondary': '#909097',
        'secondary-bg': '#e4e6eb',
        'link-hover': '#f1f2f4',
        'black-hover': '#111114',
        'orange': '#ffa734',
        'yellow': '#ffe96d',
        'gray-bg': '#f1f2f4',
        'body': '#f5f5f5',
        'white01': '#ffffff1a',
        'white002': '#ffffff05',
        'black01': '#1e1e231a',
        'black075': '#31373dbf',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      spacing: {
        '50': '50%',
        '100': '100px',
        '200': '200px',
        '15': '15px',
        '30': '30px',
        '60px': '60px',
      },
      screens: {
        'xs': '576px'
      }
    },
  },
  plugins: [],
}