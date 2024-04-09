import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type Inputs = {
	email: string
	password: string
}

const RequestRestoringAccessForm = () => {
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

	const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
		await authStore.requestRestoreAccess(email)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-96 h-full relative bg-black flex flex-col p-5 rounded-lg'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<h2 className='text-lg text-violet text-center mb-5'>
				Запрос на смену пароля
			</h2>

			<Input
				type='text'
				isEdit
				register={register('email', { required: 'Заполните это поле' })}
				placeholder='Email'
				className='mb-2'
			/>
			{errors.email && <p className='text-red mb-2'>{errors.email.message}</p>}

			<Button
				type='submit'
				loadingColor='white'
				isLoading={isSubmitting}
				className='bg-violet text-white my-2 p-1'
			>
				Восстановить доступ
			</Button>

			<p className='text-gray block m-auto text-sm text-center border-t-[1px] border-gray mt-3 pt-3'>
				Письмо с ссылкой для восстановления доступа будет отправлено на
				указанную почту
			</p>
		</form>
	)
}

export default observer(RequestRestoringAccessForm)
