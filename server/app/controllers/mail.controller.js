import MailService from '../services/Mail.service.js'
import ErrorsUtils, { BadRequest } from '../utils/Errors.js'

class MailController {
	constructor() {
		this.queue = []
	}

	sendContactMail = async (req, res, next) => {
		try {
			const { data } = req.body
			const { user, ip } = req

			const isIpBlocked = this.queue.find(elem => elem === ip)
			if (isIpBlocked)
				throw new BadRequest(
					'Сообщения через форму можно отправлять каждые 30 сек'
				)

			await MailService.sendContactMail(data, user)

			this.queue.push(ip)

			setTimeout(() => {
				const index = this.queue.indexOf(ip)
				if (index !== -1) this.queue.splice(index, 1)
			}, 30000)

			return res.status(200).json({ message: 'Сообщение отправлено' })
		} catch (err) {
			console.log(err)
			return ErrorsUtils.catchError(res, err)
		}
	}
}

export default new MailController()
