import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Container from '../../layouts/Container'

const Profile: FC = () => {
	return (
		<>
			<section className='bg-[#595961] p-2'>
				<Container>
					<Link
						to={'/profile'}
						className='mr-5 text-[#A7ACB0]  hover:text-white'
					>
						Profile
					</Link>
					<Link to={'users'} className='mr-5 text-[#A7ACB0] hover:text-white'>
						Users
					</Link>
				</Container>
			</section>
			<section>
				<Container>
					<Outlet />
				</Container>
			</section>
		</>
	)
}

export default observer(Profile)
