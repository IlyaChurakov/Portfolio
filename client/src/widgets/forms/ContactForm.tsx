import Button from '@shared/ui/Button'
import Input from '@shared/ui/Input'
import Textarea from '@shared/ui/Textarea'
import classNames from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
	company: string
	message: string
}

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
		} catch (e) {}
	}

	return (
		<form className='p-5 w-full'>
			<h1 className='text-white text-4xl font-extrabold mb-10 p-0'>
				Связаться со мной
			</h1>

			<div
				className={classNames(
					'w-full mb-10 grid grid-cols-[1fr_0.5fr] gap-x-5 justify-items-center'
				)}
			>
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
						register={register('company')}
						placeholder='Почта'
						className='mb-5 w-full'
					/>

					<Input
						type='phone'
						isEdit
						register={register('company')}
						placeholder='Телефон'
						className='mb-5 w-full'
					/>

					<Textarea
						isEdit
						register={register('message')}
						placeholder='Сообщение'
						className='w-full'
					/>
				</div>

				<img src='PostBox.png' alt='img' className='h-[225px]' />
			</div>

			<Button
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
