import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../layouts/Container'
import ProjectService from '../../services/Project.service'

const Project = () => {
	const { id } = useParams()

	const { data } = useQuery({
		queryKey: ['get project', id],
		queryFn: () => ProjectService.getProject(id),
	})

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<>
			<section className='w-full bg-[url(https://dalectricotraining.files.wordpress.com/2018/09/cabezote.jpg)] bg-cover bg-center py-10 min-h-[40vh]'>
				<Container>
					<h1 className='text-white text-4xl font-bold mb-5'>
						{data?.data?.name}
					</h1>
					<h2 className='text-white text-lg'>
						Приложение для ведения тренировок в зале
					</h2>
				</Container>
			</section>
			<section className='pt-10 bg-white'>
				<Container>
					<div className='flex'>
						<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
							React
						</div>
						<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
							Mobx
						</div>
						<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
							Tanstack / React-query
						</div>
						<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
							Express
						</div>
						<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
							Prisma
						</div>
					</div>
				</Container>
			</section>
			<section className='py-10 bg-white'>
				<Container>
					<h2 className='text-xl py-2'>Идея</h2>
					<p className='py-2'>
						Разработка была основана на интересе создать действительно полезное
						и удобное приложение для занятий в зале, которым я буду пользоваться
						сам, а так как создавать приложение только для себя смысла мало -
						оно стало доступным для всех
					</p>
					<p className='py-2'>
						Стек технологий был в голове изначально - это те технологии, в
						которых я хотел попрактиковаться
					</p>
					<p className='py-2'>
						Mobx был выбран в качестве стейт менеджера потому что он удобен для
						небольших приложений. По сравнению с тем же redux, чтобы создать
						стор не нужно писать много бойлерплейта
					</p>
					<p className='py-2'>
						В качестве ORM была выбрана Prisma по нескольким причинам:
					</p>
					<ul className=' list-disc pl-5'>
						<li>Удобство использования</li>
						<li>Популярность</li>
					</ul>
				</Container>
			</section>
		</>
	)
}

export default Project
