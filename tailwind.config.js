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
      'dark-border': '#353C4A'
    }
  }
}
//add dark mode
export const darkMode = 'class'
export const plugins = []
