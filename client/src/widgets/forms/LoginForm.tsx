import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	email: string
	password: string
}

const LoginForm = () => {
	const navigate = useNavigate()
	const { authStore } = useStores()

	useEffect(() => {
		if (authStore.isAuth) navigate('/')
	}, [authStore.isAuth])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		await authStore.login(email, password)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-96 h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<h2 className='text-lg text-violet text-center mb-5'>Вход в аккаунт</h2>

			<Input
				type='text'
				isEdit
				register={register('email', { required: 'Заполните это поле' })}
				placeholder='Email'
				className='mb-2'
			/>
			{errors.email && <p className='text-red mb-2'>{errors.email.message}</p>}

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

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Авторизоваться
			</Button>

			<div className='text-sm text-gray border-t-[1px] border-gray mt-3 pt-3'>
				<div className='flex justify-start'>
					<p className='mr-2'>Еще нет аккаунта?</p>
					<Link to={'/register'} className='text-violet block'>
						Зарегистрироваться
					</Link>
				</div>

				<div className='flex justify-start'>
					<p className='mr-2'>Забыли пароль?</p>
					<Link to={'/restore-access'} className='text-violet block'>
						Восстановить
					</Link>
				</div>
			</div>
		</form>
	)
}

export default observer(LoginForm)
