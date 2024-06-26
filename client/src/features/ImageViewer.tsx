import Button from '@shared/ui/Button'
import Centered from '@shared/ui/Centered'
import { useEffect, useState } from 'react'

const ImageViewer = ({
	path,
	closeHandler,
}: {
	path: string | undefined
	closeHandler: Function
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(!!path)

	useEffect(() => {
		setIsVisible(!!path)
	}, [path])

	if (!isVisible) return null

	return (
		<div className='fixed top-0 left-0 w-screen h-screen bg-[#00000085] flex justify-center items-center z-50'>
			<div className='relative w-screen h-screen'>
				<Button
					onClick={() => closeHandler(undefined)}
					className='absolute top-[25px] right-[50px]'
				>
					Закрыть
				</Button>
				<Centered>
					<img
						src={import.meta.env.VITE_API_STATIC_URL + path}
						alt='img'
						className=' max-w-[90vw] max-h-[90vh]'
					/>
				</Centered>
			</div>
		</div>
	)
}

export default ImageViewer
