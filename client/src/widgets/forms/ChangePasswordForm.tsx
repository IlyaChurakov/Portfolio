import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

type Inputs = {
	password: string
}

const ChangePasswordForm = () => {
	const navigate = useNavigate()
	const { authStore } = useStores()
	const { pathname } = useLocation()

	useEffect(() => {
		if (authStore.isAuth) {
			navigate('/')
		}
	}, [authStore.isAuth])

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({
		mode: 'onSubmit',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ password }) => {
		await authStore.changePassword(password, pathname.split('/')[2])

		navigate('/login')
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
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
				Восстановить доступ
			</Button>

			<p className='text-violet block m-auto'>
				Письмо с ссылкой для восстановления доступа будет отправлено на
				указанную почту
			</p>
		</form>
	)
}

export default observer(ChangePasswordForm)
