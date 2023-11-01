/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				gold: '#D6A47C',
				'gray-dark': '#595961',
				'gray-light': '#DDDDDD',
				beige: '#F4EDDD',
			},
			fontFamily: {
				sans: ['IBM Plex Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
