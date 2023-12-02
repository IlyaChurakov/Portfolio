import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../ui/Footer'

interface Props {
	children: ReactNode
}

const Page: FC<Props> = ({ children }) => {
	const { pathname } = useLocation()

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex-1 bg-gray-dark relative'>{children}</div>
			{pathname !== '/login' && pathname !== '/register' && <Footer />}
		</div>
	)
}

export default Page
