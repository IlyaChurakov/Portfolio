import 'colors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import express from 'express'
import morgan from 'morgan'
import router from './app/routes/index.js'
import { prisma } from './app/utils/prisma.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())
	app.use(cookieParser())

	app.use('/api', router)

	// app.use(errorMiddleware)

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
				.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async err => {
		console.log(err)
		await prisma.$disconnect()
		process.exit(1)
	})
