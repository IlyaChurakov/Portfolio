import ReactLoading from 'react-loading'

const ModalLoader = () => {
	return (
		<div className='w-full h-full flex flex-col justify-center items-center'>
			<ReactLoading type={'bubbles'} color={'white'} />
			<p className='text-white'>Отправка формы</p>
		</div>
	)
}

export default ModalLoader
