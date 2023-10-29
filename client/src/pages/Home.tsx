import { observer } from 'mobx-react-lite'
import { FC } from 'react'

const Home: FC = () => {
	return (
		<div className='flex flex-col justify-center '>
			<div className='h-72 bg-green-700 p-5 pt-10'>
				<h1 className='text-white text-4xl font-extrabold mb-5'>
					ИЛЬЯ ЧУРАКОВ
				</h1>
				<h2 className='text-black text-4xl font-extrabold'>
					портфолио <br /> <span className=' text-gray-700'>front-end</span>
					<br />
					разработчика
				</h2>
			</div>
		</div>
	)
}

export default observer(Home)
