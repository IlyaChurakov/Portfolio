import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import ApiError from '../errors/api.error.js'

dotenv.config()

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD
			}
		})
	}

	async sendActivationMail(email, link) {
		try {
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: 'Активация аккаунта на ' + process.env.API_URL,
				text: '',
				html: `
				<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${link}">${link}</a>
				</div>
			`
			})
		} catch (err) {
			throw ApiError.BadRequest('Не удалось отправить письмо')
		}
	}

	async sendResetMail(email, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: 'Смена пароля на ' + process.env.API_URL,
			text: '',
			html: `
				<div>
					<h1>Для смены пароля перейдите по ссылке</h1>
					<a href="${link}">${link}</a>
					<p>Если вы не запрашивали смену пароля просто игнорируйте это письмо</p>
				</div>
			`
		})
	}

	async sendContactMail(data, user) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: 'churakov018@mail.ru',
			subject: 'Обратная связь с ' + process.env.API_URL,
			text: user
				? `Сообщение от пользователя ${user.name}`
				: `Сообщение от незарегистированного пользователя`,
			html: `
				<div>
					<h1>${data.company}</h1>
					<p>Почта: ${data.email}</p>
					<p>Телефон: ${data.phone}</p>
					<p>${data.text}</p>
				</div>
			`
		})
	}
}

export default new MailService()
