/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				white: '#fff',
				gray: '#6F7680',
				violet: '#9255E8',
				'gray-dark': 'rgb(35,36,38)',
				black: '#171717',
				red: '#C24D51',
				green: 'rgb(65, 155, 65)',
			},
			fontFamily: {
				sans: ['Rubik', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
