import ReactLoading from 'react-loading'

const Loader = () => {
	return (
		<div className='absolute h-screen w-screen flex justify-center items-center bg-gray-dark z-50'>
			<ReactLoading type='bubbles' color='white' height={100} width={100} />
		</div>
	)
}

export default Loader
