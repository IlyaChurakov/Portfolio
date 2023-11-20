import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../ui/Footer'
import Header from '../ui/Header'

interface Props {
	children: ReactNode
}

const Page: FC<Props> = ({ children }) => {
	const { pathname } = useLocation()

	return (
		<div className='flex flex-col min-h-screen'>
			{pathname !== '/login' &&
				pathname !== '/register' &&
				pathname !== '/' && <Header />}
			<div className='flex-1 bg-[#DDDDDD] relative'>{children}</div>
			{pathname !== '/login' && pathname !== '/register' && <Footer />}
		</div>
	)
}

export default Page
