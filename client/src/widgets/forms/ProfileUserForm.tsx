import { useStores } from '@app/index'
import ImageLoader from '@pages/projects/page-constructor/components/ImageLoader'
import Input from '@shared/ui/form/Input'
import Textarea from '@shared/ui/form/Textarea'
import { transformDate, uploadFile } from '@shared/utils/utils'
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

	const static_url = import.meta.env.VITE_API_STATIC_URL

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, dirtyFields },
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
				user.avatar = null
			}

			await userStore.update(user)

			closeForm()
		} catch (err) {
			errorStore.add((err as AxiosError).message)
		}
	}

	const deleteAccount = async () => {
		if (confirm('Вы действительно хотите удалить свой аккаунт?')) {
			await userStore.deleteAccount(userStore.user.id)
			navigate('/login')
		}
	}

	const closeForm = () => {
		setIsEditForm(false)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full bg-black p-5 grid grid-cols-[10rem_1fr_8rem] gap-5 rounded-[10px]'
			style={{
				boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
			}}
		>
			<div>
				{isEditForm ? (
					<ImageLoader
						uploadedImageUrl={userStore.user.avatar}
						register={register('avatar')}
						setValue={setValue}
					/>
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

			<div className='flex flex-col'>
				<Input
					isEdit={isEditForm}
					type='text'
					register={register('name')}
					placeholder='Имя'
				>
					<p className='text-start text-3xl text-white font-bold mb-3'>
						{userStore.user.name}
					</p>
				</Input>

				<Textarea
					isEdit={isEditForm}
					register={register('description')}
					placeholder='Описание'
				>
					<p className='text-white mb-5'>{userStore.user.description}</p>
				</Textarea>

				<Input
					isEdit={isEditForm}
					type='text'
					register={register('email')}
					placeholder='Email'
				>
					<p className='flex items-center text-start text-violet mb-3'>
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

			<div className='flex flex-col justify-between'>
				{isEditForm ? (
					<>
						<Button type='submit' text='Сохранить' isLoading={isSubmitting} />
						<Button text='Отменить' onClick={closeForm} />
					</>
				) : (
					<Button text='Редактировать' onClick={() => setIsEditForm(true)} />
				)}

				<Button text='Удалить аккаунт' onClick={deleteAccount} />
			</div>
		</form>
	)
}

export default observer(ProfileUserForm)
