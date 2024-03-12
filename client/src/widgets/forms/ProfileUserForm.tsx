import { useStores } from '@app/index'
import ImageLoader from '@features/ImageLoader'
import { transformDate, uploadFile } from '@shared/lib/utils'
import Input from '@shared/ui/form/Input'
import Textarea from '@shared/ui/form/Textarea'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCreate } from 'react-icons/io'
import { MdAlternateEmail, MdPublishedWithChanges } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Button from '../../shared/ui/form/Button'

interface ProfileUserFormFields {
	avatar?: FileList
	name: string
	email: string
	description: string
}

const ProfileUserForm = () => {
	const { userStore, errorStore } = useStores()
	const navigate = useNavigate()

	const [isEditForm, setIsEditForm] = useState<boolean>(false)
	const [isDeletedAvatar, setIsDeletedAvatar] = useState<boolean>(false)

	const static_url = import.meta.env.VITE_API_STATIC_URL

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
		setValue,
	} = useForm<ProfileUserFormFields>({
		values: {
			name: userStore.user.name,
			email: userStore.user.email,
			description: userStore.user.description,
		},
	})

	const onSubmit = async ({ avatar, ...data }: ProfileUserFormFields) => {
		try {
			const user = {
				...userStore.user,
				...data,
			}

			if (avatar) {
				const uploadedAvatar = await uploadFile(avatar)
				if (uploadedAvatar) user.avatar = uploadedAvatar
			} else {
				if (isDeletedAvatar) user.avatar = null
			}

			await userStore.update(user)

			closeForm()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const closeForm = () => {
		setIsEditForm(false)
		setIsDeletedAvatar(false)
		reset()
	}

	const deleteAccount = async () => {
		if (confirm('Вы действительно хотите удалить свой аккаунт?')) {
			await userStore.deleteAccount(userStore.user.id)
			navigate('/login')
		}
	}

	const deleteAvatar = () => {
		setValue('avatar', undefined)
		setIsDeletedAvatar(true)
	}

	const sendForm = handleSubmit(onSubmit)

	return (
		<form
			onSubmit={sendForm}
			className={`w-full bg-black p-5 grid grid-cols-[10rem_1fr_7.3rem] gap-5 rounded-[3px]`}
			style={{
				gridTemplateRows: isEditForm ? '1fr 40px' : '1fr',
			}}
		>
			<div>
				{isEditForm ? (
					<>
						<ImageLoader
							uploadedImageUrl={isDeletedAvatar ? null : userStore.user.avatar}
							register={register('avatar')}
							setValue={setValue}
						/>
					</>
				) : userStore.user.avatar ? (
					<img
						src={static_url + userStore.user.avatar}
						alt='avatar'
						className='w-full h-[250px] object-cover rounded-lg'
					/>
				) : (
					<div className='w-full h-full bg-gray rounded-lg'></div>
				)}
			</div>

			<div className='flex flex-col items-start border-l-[1px] border-r-[1px] border-[#9255e859] px-5'>
				<Input
					isEdit={isEditForm}
					type='text'
					register={register('name')}
					placeholder='Имя'
					className='w-full mb-3'
				>
					<p className='text-start text-3xl text-white font-bold mb-3'>
						{userStore.user.name}
					</p>
				</Input>

				<Textarea
					isEdit={isEditForm}
					register={register('description')}
					placeholder='Описание'
					className='w-full mb-3'
				>
					<p className='text-white mb-3'>{userStore.user.description}</p>
				</Textarea>

				<Input
					isEdit={isEditForm}
					type='text'
					register={register('email')}
					placeholder='Email'
					className='w-full mb-10'
				>
					<p className='flex items-center text-start text-white mb-10'>
						<MdAlternateEmail title='Email' className='mr-2' />
						{userStore.user.email}
					</p>
				</Input>

				<p className='flex items-center text-start text-violet mb-3'>
					<MdPublishedWithChanges title='Дата регистрации' className='mr-2' />
					{transformDate(userStore.user.createdAt)}
				</p>

				<p className='flex items-center text-start text-violet mb-3'>
					<IoMdCreate
						title='Дата последнего изменения профиля'
						className='mr-2'
					/>
					{transformDate(userStore.user.updatedAt)}
				</p>
			</div>

			<div className='flex justify-end items-start'>
				{isEditForm ? (
					<Button key='save' type='submit' isLoading={isSubmitting}>
						Сохранить
					</Button>
				) : (
					<Button key='edit' onClick={() => setIsEditForm(true)}>
						Редактировать
					</Button>
				)}
			</div>

			{isEditForm && (
				<>
					<div className='flex justify-center w-full'>
						<Button
							onClick={deleteAvatar}
							variant='contained-danger'
							className='w-full'
						>
							Удалить аватар
						</Button>
					</div>

					<div className='flex justify-start border-l-[1px] border-r-[1px] border-[#9255e859]'>
						<Button
							onClick={deleteAccount}
							variant='text-danger'
							className='px-[22px]'
						>
							Удалить аккаунт
						</Button>
					</div>

					<div className='flex justify-end'>
						<Button onClick={closeForm}>Отменить</Button>
					</div>
				</>
			)}
		</form>
	)
}

export default observer(ProfileUserForm)
