import { $axios, apiConfig } from '@shared/config'

export default class MailService {
	static async sendCommunicationMail(data: {
		email: string
		company: string
		text: string
		phone: string
	}) {
		const path = apiConfig.mail.contact()

		await $axios.post(path, { data })
	}
}
