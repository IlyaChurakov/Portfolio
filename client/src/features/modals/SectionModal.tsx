import { ISection } from '@app/store/projectStore/types/project.types'
import Button from '@shared/ui/form/Button'
import SectionForm from '@widgets/forms/SectionForm'
import { observer } from 'mobx-react-lite'

const SectionModal = ({
	section,
	close,
}: {
	section: ISection | null
	close: () => void
}) => {
	if (!section) return

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5'>
			<div className='flex justify-end'>
				<Button text='Отменить' onClick={close} />
			</div>

			<SectionForm closeModal={close} section={section} />
		</div>
	)
}

export default observer(SectionModal)
