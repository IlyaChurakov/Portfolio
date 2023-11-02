import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'

const Register: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [name, setName] = useState<string>('')
	const navigate = useNavigate()

	const { store } = useContext(Context)

	useEffect(() => {
		if (store.isAuth) {
			navigate('/')
		}
	}, [store.isAuth])

	return (
		<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96  bg-[#595961] flex flex-col p-5 rounded-lg'>
			<h1 className='text-center text-white'>Sign Up</h1>
			<input
				type='text'
				placeholder='Name'
				onChange={e => setName(e.target.value)}
				value={name}
				className='mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			<input
				type='email'
				placeholder='Email'
				onChange={e => setEmail(e.target.value)}
				value={email}
				className='mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
				value={password}
				className='mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>

			<div className='grid grid-rows-2 items-center justify-items-center'>
				<button
					className='w-full bg-transparent border border-[#D6A47C] rounded-sm text-white hover:text-[#595961] hover:bg-[#D6A47C]'
					onClick={() => store.register(email, password, name)}
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
		</div>
	)
}

export default observer(Register)
