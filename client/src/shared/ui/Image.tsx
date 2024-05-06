import { IBlock } from '@app/store/projectStore/project.types'
import { WithLinks } from '@shared/lib/WithLinks'
import { MouseEventHandler, useState } from 'react'

const Image = ({
	block,
	onClick,
}: {
	block: IBlock
	onClick: MouseEventHandler<HTMLImageElement>
}) => {
	const [loading, setLoading] = useState<boolean>(true)

	const handleLoad = () => {
		setLoading(false)
	}

	const staticUrl = import.meta.env.VITE_API_STATIC_URL
	const url = staticUrl + block.imgPath

	return (
		<>
			{loading && (
				<div className='text-white h-64 w-96 bg-gray m-auto flex justify-center items-center rounded-lg'>
					Img
				</div>
			)}
			<img
				src={url}
				onClick={onClick}
				alt='img'
				onLoad={handleLoad}
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
