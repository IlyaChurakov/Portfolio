import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
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
		formState: { isSubmitting },
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (authStore.isAuth) navigate('/')
	}, [authStore.isAuth])

	const onSubmit: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}: Inputs) => {
		await authStore.register(email, password, name)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-96 h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<h2 className='text-lg text-violet text-center mb-5'>Регистрация</h2>

			<Input
				isEdit
				type='text'
				placeholder='Имя'
				register={register('name', { required: true })}
				className='my-2'
			/>

			<Input
				isEdit
				type='text'
				placeholder='Email'
				register={register('email', { required: true })}
				className='my-2'
			/>

			<Input
				isEdit
				type='password'
				placeholder='Пароль'
				register={register('password', { required: true })}
				className='my-2'
			/>

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Зарегистрироваться
			</Button>

			<div className='flex justify-start text-sm text-gray border-t-[1px] border-gray mt-3 pt-3'>
				<p className='mr-2'>Уже есть аккаунт?</p>
				<Link to={'/login'} className='text-violet block'>
					Войти
				</Link>
			</div>
		</form>
	)
}

export default observer(RegisterForm)
