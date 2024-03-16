import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	name: string
	email: string
	password: string
}

const RegisterForm = () => {
	const { authStore } = useStores()

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (authStore.isAuth) {
			navigate('/')
		}
	}, [authStore.isAuth])

	const onSubmit: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}: Inputs) => {
		try {
			await authStore.register(email, password, name)
		} catch (e) {
			const err = e as AxiosError

			if (err.response?.status === 400) {
				setError('email', {
					type: 'value',
					message: 'Пользователь с таким email уже существует',
				})
			}
		}
	}

	return (
		<form
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
			onSubmit={handleSubmit(onSubmit)}
			className='w-full h-full relative bg-black flex flex-col p-5 rounded-lg'
		>
			<Input
				isEdit
				type='text'
				placeholder='Имя'
				register={register('name', { required: true })}
				className='my-2'
			/>
			{errors.name && <p className='text-red'>{errors.name.message}</p>}

			<Input
				isEdit
				type='text'
				placeholder='Email'
				register={register('email', { required: true })}
				className='my-2'
			/>
			{errors.name && <p className='text-red'>{errors.name.message}</p>}

			<Input
				isEdit
				type='password'
				placeholder='Пароль'
				register={register('password', { required: true })}
				className='my-2'
			/>
			{errors.name && <p className='text-red'>{errors.name.message}</p>}

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Зарегистрироваться
			</Button>
			<Link to={'/login'} className='text-violet block m-auto'>
				Авторизоваться
			</Link>
		</form>
	)
}

export default observer(RegisterForm)
