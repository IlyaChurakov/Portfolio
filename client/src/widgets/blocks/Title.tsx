import { IBlock } from '@app/store/projectStore/types/project.types'

const Title = ({ block }: { block: IBlock }) => {
	return (
		<h1
			className={`text-4xl font-bold mb-5`}
			style={{ color: block.color }}
			key={block.id}
		>
			{block.text}
		</h1>
	)
}

export default Title
