import { IBlock } from '@app/store/projectStore/types/project.types'
import { WithLinks } from '@shared/lib/WithLinks'
import { MouseEventHandler } from 'react'

const Image = ({
	block,
	onClick,
}: {
	block: IBlock
	onClick: MouseEventHandler<HTMLImageElement>
}) => {
	const staticUrl = import.meta.env.VITE_API_STATIC_URL
	const url = staticUrl + block.imgPath

	return (
		<>
			<img
				src={url}
				onClick={onClick}
				alt='img'
				className='max-w-[50%] max-h-64 m-auto my-5 object-cover cursor-zoom-in'
			/>
			{block.imgDescr && (
				<p
					className={`m-auto flex justify-center`}
					style={{ color: block.color }}
				>
					<WithLinks text={block.imgDescr} />
				</p>
			)}
		</>
	)
}

export default Image
