import { Router } from 'express'
import mailController from '../controllers/mail.controller.js'

const router = new Router()

router.post('/contact', mailController.sendContactMail)

export default router
