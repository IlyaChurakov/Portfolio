import * as Yup from 'yup'
import validateRequest from '../utils/ValidateRequest.js'

export const signInSchema = Yup.object({
	body: Yup.object({
		email: Yup.string()
			.required('Поле обязательно!')
			.email('Неверный формат email'),
		password: Yup.string()
			.required('Поле обязательно!')
			.min(3, 'Пароль слишком короткий - минимум 3 символа')
			.max(50, 'Максимальная длина - 50 символов')
	})
})

export const signUpSchema = Yup.object({
	body: Yup.object({
		name: Yup.string()
			.required('Поле обязательно!')
			.max(50, 'Максимальное значение - 50'),
		email: Yup.string()
			.required('Поле обязательно!')
			.email('Неверный формат email'),
		password: Yup.string()
			.required('Поле обязательно!')
			.min(3, 'Пароль слишком короткий - минимум 3 символа')
			.max(50, 'Максимальная длина - 50 символов')
	})
})

export const logoutSchema = Yup.object({
	cookies: Yup.object({
		refreshToken: Yup.string().required('Поле обязательно!')
	})
})

class AuthValidator {
	static async signIn(req, res, next) {
		return validateRequest(req, res, next, signInSchema)
	}

	static async signUp(req, res, next) {
		return validateRequest(req, res, next, signUpSchema)
	}

	static async logOut(req, res, next) {
		return validateRequest(req, res, next, logoutSchema)
	}

	static async refresh(req, res, next) {
		return validateRequest(req, res, next)
	}
}

export default AuthValidator
