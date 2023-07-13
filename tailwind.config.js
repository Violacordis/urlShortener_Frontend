/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      'primary-pink': '#EB568E',
      'primary-blue': '#144EE3',
      'primary-black': '#0B101B',
      'primary-grey': '#181E29',
      'primary-lite': '#C9CED6',
      white: '#FFFFFF',
      'dark-border': '#353C4A',
      'dark-hd': '#0D1117',
      'green-acc': '#1EB036',
      'brown-acc': '#B0901E',
      'lite-green': 'rgba(30, 176, 54, 0.14)',
      'lite-brown':"rgba(176, 144, 30, 0.19)",
      "lite-blue":"rgba(24, 30, 41, 0.22)",

    },
    backgroundImage: {
      'dark-mobile': "url('/images/back-mobile.jpg')",
      'dark-desktop': "url('/images/back-desktop.jpg')",
      'dark-tablet': "url('/images/back-tablet.jpg')",
      'user-image': "url('/images/icons8-user.svg')",
    }
  }
}
//add dark mode
export const darkMode = 'class'
export const plugins = []
