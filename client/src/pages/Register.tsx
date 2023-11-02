import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'

type Inputs = {
	name: string
	email: string
	password: string
}

const Register: FC = () => {
	const { store } = useContext(Context)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (store.isAuth) {
			navigate('/')
		}
	}, [store.isAuth])

	const onSubmit: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}: Inputs) => {
		try {
			await store.register(email, password, name)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<form
			className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96  bg-[#595961] flex flex-col p-5 rounded-lg'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-center text-white'>Sign Up</h1>
			<input
				type='text'
				defaultValue=''
				placeholder='Name'
				{...register('name', { required: 'Name is required' })}
				className='mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			{errors.name && <p className='text-red-500'>{errors?.name?.message}</p>}

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
					className='w-full bg-transparent border border-[#D6A47C] rounded-sm text-white hover:text-[#595961] hover:bg-[#D6A47C]'
				>
					Register
				</button>
				<Link
					to={'/login'}
					className='text-[#D6A47C] mt-2 text-[14px] underline'
				>
					Sign In
				</Link>
			</div>
		</form>
	)
}

export default observer(Register)
