/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary : '#D9D9D9',
        accent : '#6697E0',
        onSecondary : '#2E4857',
        success : '#00C814',
        failure : '#E20000',
        primary : '#FFF'
      },
      maxWidth : {
        'contentWid': '65em',
        'contentWidLg':'83.1875em',
        'searchBarWid' : '24em'
      },
      minWidth : {
        'searchBarWid' : '2.5em'
      }
      ,
      fontSize : {
        'heroHeading': '3em + 10vw'
      },
      fontFamily : {
        'commonFont' : ['ui-serif', 'Georgia' ]
      }
    }

  },
  plugins: [],
}

// 93.1875