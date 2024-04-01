import { useStores } from '@app/index'
import Button from '@shared/ui/Button'
import DisappearMessage from '@shared/ui/DisappearMessage'
import Input from '@shared/ui/Input'
import Textarea from '@shared/ui/Textarea'
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
		} catch (e) {
			setIsSuccess(false)
			errorStore.add('Ошибка отправки сообщения')
			throw new Error()
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
						<div className='text-green'>Данные отправлены!</div>
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

export default ContactForm
