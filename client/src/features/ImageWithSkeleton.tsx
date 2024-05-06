import { useState } from 'react'

function ImageWithSkeleton({ imagePath }: { imagePath: string }) {
	const [loading, setLoading] = useState<boolean>(true)

	const handleLoad = () => {
		setLoading(false)
	}

	return (
		<div style={{ position: 'relative', width: '100%', height: '100%' }}>
			{loading && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: '#f3f3f3', // Цвет фона для скелета
						animation: 'pulse 1.5s infinite ease-in-out', // Анимация для эффекта пульсации
						borderRadius: '8px', // Закругление углов, если нужно
					}}
				/>
			)}
			<img
				src={imagePath}
				alt='img'
				className='w-full h-full object-cover rounded-lg'
				onLoad={handleLoad} // Вызывается, когда изображение загружено
				style={{ opacity: loading ? 0 : 1 }} // Прозрачность: 0 во время загрузки, 1 после загрузки
			/>
		</div>
	)
}

export default ImageWithSkeleton
