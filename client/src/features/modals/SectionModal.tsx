import { ISection } from '@app/store/projectStore/types/project.types'
import SectionForm from '@widgets/forms/SectionForm'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import styles from './modal.module.css'

const SectionModal = ({
	section,
	close,
}: {
	section: ISection | null
	close: () => void
}) => {
	if (!section) return

	return (
		<div
			className={classNames(
				'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5 z-50',
				styles.wrapper
			)}
		>
			<SectionForm closeModal={close} section={section} />
		</div>
	)
}

export default observer(SectionModal)
