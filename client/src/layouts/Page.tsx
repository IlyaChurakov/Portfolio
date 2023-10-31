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
			{pathname !== '/login' && <Header />}
			<div className='flex-1'>{children}</div>
			{pathname !== '/login' && <Footer />}
		</div>
	)
}

export default Page