import { IBlock } from '@app/store/projectStore/types/project.types'
import { WithLinks } from '../../shared/lib/withLinks'

const Text = ({ block }: { block: IBlock }) => {
	return (
		<p style={{ color: block.color }} className='py-2' key={block.id}>
			<WithLinks text={block.text} linkStyles={{ color: '#9255E8' }} />
		</p>
	)
}

export default Text
