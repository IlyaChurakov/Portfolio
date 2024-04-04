import * as yup from 'yup'

export default yup.object().shape({
	name: yup.string().required('Имя обязательно для заполнения'),
	email: yup
		.string()
		.email('Неверный формат email')
		.required('Email обязателен для заполнения'),
	password: yup
		.string()
		.min(8, 'Пароль должен содержать минимум 8 символов')
		.required('Пароль обязателен для заполнения')
})
