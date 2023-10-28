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
		<div>
			<input
				type='text'
				placeholder='Name'
				onChange={e => setName(e.target.value)}
				value={name}
			/>
			<input
				type='email'
				placeholder='Email'
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>

			<div>
				<button onClick={() => store.login(email, password)}>Login</button>
				<button onClick={() => store.register(email, password, name)}>
					Register
				</button>
			</div>
		</div>
	)
}

export default observer(Login)
