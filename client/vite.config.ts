import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			'@app': resolve(__dirname, './src/app'),
			'@shared': resolve(__dirname, './src/shared'),
			'@features': resolve(__dirname, './src/features'),
			'@entities': resolve(__dirname, './src/entities'),
			'@pages': resolve(__dirname, './src/pages'),
			'@widgets': resolve(__dirname, './src/widgets'),
		},
	},
})
