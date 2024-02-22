import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext, useStores } from '@app/provider/store/store'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

type Inputs = {
	email: string
	password: string
}

const Login: FC = observer(() => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const { isAuth, login } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.authStore
	)

	useEffect(() => {
		if (isAuth) {
			navigate('/')
		}
	}, [isAuth])

	const onSubmit: SubmitHandler<Inputs> = async ({
		email,
		password,
	}: Inputs) => {
		try {
			await login(email, password)
		} catch (e) {
			const err = e as AxiosError

			if (err.response?.status === 404) {
				setError('email', {
					type: 'value',
					message: 'Неверный логин',
				})
			} else if (err.response?.status === 401) {
				setError('password', {
					type: 'value',
					message: 'Неверный пароль',
				})
			} else {
				console.log(`Неизвестная ошибка ${err.status}: ${err.message}`)
			}
		}
	}

	return (
		<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96'>
			<form
				className='w-full h-full relative bg-black flex flex-col p-5 rounded-lg '
				style={{
					boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<input
					type='email'
					defaultValue=''
					placeholder='Email'
					{...register('email', { required: 'Email is required' })}
					className='mt-5 bg-transparent border-[1px] border-violet p-1 pl-2 outline-0 text-violet placeholder:text-violet placeholder:text-sm rounded-lg'
				/>
				{errors.email && <p className='text-red h-3'>{errors.email.message}</p>}

				<input
					type='password'
					defaultValue=''
					placeholder='Password'
					{...register('password', { required: 'Password is required' })}
					className='mt-5 bg-transparent border-[1px] border-violet p-1 pl-2 outline-0 text-violet placeholder:text-violet placeholder:text-sm rounded-lg'
				/>
				{errors.password && (
					<p className='text-red h-3'>{errors.password.message}</p>
				)}

				<div className='grid grid-rows-2 items-center justify-items-center mt-5'>
					<button
						type='submit'
						className='w-full bg-violet rounded-sm text-white mt-5'
					>
						Log in
					</button>
					<Link
						to={'/register'}
						className='text-violet mt-2 text-[14px] underline'
					>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	)
})

export default Login
