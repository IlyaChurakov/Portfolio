import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'

type Inputs = {
	email: string
	password: string
}

const Login: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const navigate = useNavigate()

	const { store } = useContext(Context)

	useEffect(() => {
		if (store.isAuth) {
			navigate('/')
		}
	}, [store.isAuth])

	const onSubmit: SubmitHandler<Inputs> = async ({
		email,
		password,
	}: Inputs) => {
		try {
			await store.login(email, password)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<form
			className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96  bg-[#595961] flex flex-col p-5 rounded-lg'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-center text-white mb-2'>Sign In</h1>

			<input
				type='email'
				defaultValue=''
				placeholder='Email'
				{...register('email', { required: 'Email is required' })}
				className='bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			{errors.email && <p className='text-red-500'>{errors?.email?.message}</p>}

			<input
				type='password'
				defaultValue=''
				placeholder='Password'
				{...register('password', { required: 'Password is required' })}
				className='mt-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			{errors.password && (
				<p className='text-red-500'>{errors?.password?.message}</p>
			)}

			<div className='grid grid-rows-2 items-center justify-items-center'>
				<button
					type='submit'
					className='w-full bg-transparent border border-[#D6A47C] rounded-sm text-white hover:text-[#595961] hover:bg-[#D6A47C] mt-5'
				>
					Login
				</button>
				<Link
					to={'/register'}
					className='text-[#D6A47C] mt-2 text-[14px] underline'
				>
					Sign Up
				</Link>
			</div>
		</form>
	)
}

export default observer(Login)
