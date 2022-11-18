/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        accent : '#6697E0',
        onSecondary : '#2E4857',
        success : '#00C814',
        failure : '#E20000',

        primary : '#FFF',
        secondary : '#D9D9D9',
        textColor1 : '#2E4857',
        textColor2 : '#5A6A73',
        textColor3 : '#91ABBA',
        danger : '#F68282'
      },
      maxWidth : {
        'contentWid': '65em',
        'contentWidLg':'83.1875em',
        'searchBarWid' : '24em',
        'iconWid':'2.5em',
        'iconWidSm':'1.2em',
        'navIconContainerWid1' : '20em',
        'navIconContainerWid2' : '29em',
        'navIconContainerWid3' : '32em',
        'blogCardWid' : '37em',
        'blogCardWidLg' : '40em',
        'avatarWidth' : '3em'
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