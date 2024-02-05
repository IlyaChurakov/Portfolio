import useUpload from '@shared/hooks/useUpload'
import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, memo, useContext } from 'react'
import { TbDownload } from 'react-icons/tb'
import { Context } from '../../../main'

const Avatar: React.FC = observer(() => {
	const { store } = useContext(Context)

	const { selectFile, upload } = useUpload()

	const uploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = selectFile(e)
		if (!file) return

		const fileName = await upload(file)

		await store.assignAvatar(store.user.id, fileName)
	}

	return (
		<label htmlFor='select_avatar' className='cursor-pointer'>
			<input
				id='select_avatar'
				type='file'
				onChange={e => uploadAvatar(e)}
				className='h-0 w-0 absolute block -z-10 opacity-0'
			/>

			<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
				<TbDownload className='text-2xl' />
			</div>

			{store.user.avatar ? (
				<img
					src={`${import.meta.env.VITE_API_STATIC_URL}/${store.user.avatar}`}
					alt='avatar'
					className='w-full h-full object-cover rounded-lg hover:opacity-30'
				/>
			) : (
				<div className='h-full w-full bg-gray'></div>
			)}
		</label>
	)
})

export default memo(Avatar)