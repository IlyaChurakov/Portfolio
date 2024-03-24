import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../../widgets/Footer'

const Page = ({ children }: { children: ReactNode }) => {
	const { pathname } = useLocation()

	return (
		<div className='flex flex-col w-full min-h-screen'>
			<div className='flex-1 relative bg-gray-dark'>{children}</div>
			{pathname !== '/login' && pathname !== '/register' && <Footer />}
		</div>
	)
}

export default Page
