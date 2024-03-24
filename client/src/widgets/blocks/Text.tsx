import { IBlock } from '@app/store/projectStore/types/project.types'
import { WithLinks } from '../../shared/lib/withLinks'

const Text = ({
	block,
	color = '#9255E8',
}: {
	block: IBlock
	color?: string
}) => {
	return (
		<p style={{ color: block.color }} className='py-2' key={block.id}>
			<WithLinks text={block.text} linkStyles={{ color }} />
		</p>
	)
}

export default Text
