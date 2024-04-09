import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

type Inputs = {
	password: string
	repeat_password: string
}

const ChangePasswordForm = () => {
	const navigate = useNavigate()
	const { authStore } = useStores()
	const { pathname } = useLocation()

	useEffect(() => {
		if (authStore.isAuth) navigate('/')
	}, [authStore.isAuth])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		watch,
	} = useForm<Inputs>({
		mode: 'onSubmit',
	})

	const password = watch('password')

	const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
		const secretFromLink = pathname.split('/')[2]

		await authStore.changePassword(password, secretFromLink)
		navigate('/login')
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-96 h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<h2 className='text-lg text-violet text-center mb-5'>Смена пароля</h2>

			<Input
				type='password'
				isEdit
				register={register('password', {
					required: 'Заполните это поле',
					minLength: {
						value: 8,
						message: 'Длина пароля должна быть не менее 8 символов',
					},
				})}
				placeholder='Пароль'
				className='mb-2'
			/>
			{errors.password && (
				<p className='text-red mb-2'>{errors.password.message}</p>
			)}

			<Input
				type='password'
				isEdit
				register={register('repeat_password', {
					required: 'Заполните это поле',
					validate: {
						positive: value => value === password || 'Пароли не совпадают',
					},
					minLength: {
						value: 8,
						message: 'Длина пароля должна быть не менее 8 символов',
					},
				})}
				placeholder='Повторите пароль'
				className='mb-2'
			/>
			{errors.repeat_password && (
				<p className='text-red mb-2'>{errors.repeat_password.message}</p>
			)}

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Восстановить доступ
			</Button>

			<p className='text-gray block m-auto text-sm text-center border-t-[1px] border-gray mt-3 pt-3'>
				После ввода нового пароля, вы будете перенаправлены на страницу
				авторизации
			</p>
		</form>
	)
}

export default observer(ChangePasswordForm)
