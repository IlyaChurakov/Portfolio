import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'

const Login: FC = () => {
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
		<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96  bg-green-600 flex flex-col p-5'>
			<input
				type='text'
				placeholder='Name'
				onChange={e => setName(e.target.value)}
				value={name}
				className='mb-5 bg-transparent border border-white rounded-sm p-1 outline-0 text-white placeholder:text-white'
			/>
			<input
				type='email'
				placeholder='Email'
				onChange={e => setEmail(e.target.value)}
				value={email}
				className='mb-5 bg-transparent border border-white rounded-sm p-1 outline-0 text-white placeholder:text-white'
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
				value={password}
				className='mb-5 bg-transparent border border-white rounded-sm p-1 outline-0 text-white placeholder:text-white'
			/>

			<div className=' grid grid-cols-2 gap-5'>
				<button
					className='w-full bg-transparent border border-white rounded-sm text-white hover:text-green-600 hover:bg-white'
					onClick={() => store.login(email, password)}
				>
					Login
				</button>
				<button
					className='w-full bg-transparent border border-white rounded-sm text-white hover:text-green-600 hover:bg-white'
					onClick={() => store.register(email, password, name)}
				>
					Register
				</button>
			</div>
		</div>
	)
}

export default observer(Login)
