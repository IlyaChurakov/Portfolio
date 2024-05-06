import { useStores } from '@app/index'
import { AuthResponse } from '@app/store/authStore/auth.types'
import DisappearMessage from '@features/DisappearMessage'
import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import Textarea from '@shared/ui/Textarea'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import MailService from '../../services/Mail.service'

type Inputs = {
	company: string
	text: string
	phone: string
	email: string
}

const ContactForm = () => {
	const { errorStore } = useStores()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const [isSuccess, setIsSuccess] = useState<boolean>(false)

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			await MailService.sendCommunicationMail(data)

			reset()
			setIsSuccess(true)
		} catch (err) {
			setIsSuccess(false)
			const error = err as AxiosError<AuthResponse>
			if (error.response?.data.error) errorStore.add(error.response?.data.error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-10 grid grid-cols-[1fr_0.5fr] gap-x-5 justify-items-center'>
				<div className='w-full'>
					<Input
						type='text'
						isEdit
						register={register('company')}
						placeholder='Компания'
						className='mb-5 w-full'
					/>

					<Input
						type='email'
						isEdit
						register={register('email')}
						placeholder='Почта'
						className='mb-5 w-full'
					/>

					<Input
						type='phone'
						isEdit
						register={register('phone')}
						placeholder='Телефон'
						className='mb-5 w-full'
					/>

					<Textarea
						isEdit
						register={register('text')}
						placeholder='Сообщение'
						className='w-full'
					/>

					<DisappearMessage trigger={isSuccess}>
						<span className='text-violet'>Данные отправлены!</span>
					</DisappearMessage>
				</div>

				<img src='PostBox.png' alt='img' className='h-[225px]' />
			</div>

			<Button
				type='submit'
				isLoading={isSubmitting}
				variant='contained'
				className='w-full h-10'
			>
				Отправить
			</Button>
		</form>
	)
}

export default observer(ContactForm)
