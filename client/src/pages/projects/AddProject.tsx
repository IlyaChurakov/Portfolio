import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'

type Inputs = {
	name: string
	email: string
	password: string
}

const AddProject: FC = () => {
	const { projectStore } = useContext(Context)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ name }: Inputs) => {
		try {
			await projectStore.createProject(name)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<form
			className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96  bg-[#595961] flex flex-col p-5 rounded-lg'
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				type='text'
				defaultValue=''
				placeholder='Name'
				{...register('name', { required: 'Name is required' })}
				className='mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			{errors.name && <p className='text-red-500'>{errors?.name?.message}</p>}

			<div className='grid grid-rows-2 items-center justify-items-center'>
				<button
					type='submit'
					className='w-full bg-transparent border border-[#D6A47C] rounded-sm text-white hover:text-[#595961] hover:bg-[#D6A47C]'
				>
					Create project
				</button>
			</div>
		</form>
	)
}

export default observer(AddProject)
