import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'

const Errors = () => {
	const { errorStore } = useStores()

	return (
		<ul className='fixed bottom-5 right-5'>
			{errorStore.errors.map((error, index) => (
				<li
					key={index}
					className='relative w-[300px] h-14 text-red bg-black rounded-lg mt-5 flex items-center p-2 border-[1px] border-violet '
				>
					{/* <div className='absolute w-5 h-5 rounded-full border-[1px] border-violet top-[-5px] left-[-5px]  text-violet cursor-pointer flex justify-center items-center text-sm bg-black'>
						X
					</div> */}
					{error}
				</li>
			))}
		</ul>
	)
}

export default observer(Errors)
