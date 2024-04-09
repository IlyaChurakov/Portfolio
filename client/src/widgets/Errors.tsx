import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'

const Errors = () => {
	const { errorStore } = useStores()

	return (
		<ul className='fixed bottom-5 right-5'>
			{errorStore.errors.map((error, index) => (
				<Error key={index} error={error} />
			))}
		</ul>
	)
}

function Error({ error }: { error: string }) {
	return (
		<li className='relative w-[300px] h-14 text-red bg-black rounded-lg mt-5 flex items-center p-2 border-[1px] border-violet '>
			{error}
		</li>
	)
}

export default observer(Errors)
