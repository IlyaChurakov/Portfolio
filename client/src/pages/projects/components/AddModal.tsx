import { useState } from 'react'

const AddModal = () => {
	const [type, setType] = useState('<p>')
	const [text, setText] = useState('<p>')

	return (
		<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white border-2 border-gray-500 rounded-lg'>
			Модалка
		</div>
	)
}

export default AddModal
