import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'

const Project = () => {
	const { id } = useParams()
	const { projectStore } = useContext(Context)

	useEffect(() => {
		projectStore.getProject(id as string)
	}, [id])

	return (
		// <>
		// 	<section className='w-full bg-[url(https://dalectricotraining.files.wordpress.com/2018/09/cabezote.jpg)] bg-cover bg-center py-10 min-h-[40vh]'>
		// 		<Container>
		// 			<h1 className='text-white text-4xl font-bold mb-5'>
		// 				{data?.data?.name}
		// 			</h1>
		// 			<h2 className='text-white text-lg'>
		// 				Приложение для ведения тренировок в зале
		// 			</h2>
		// 		</Container>
		// 	</section>
		// 	<section className='pt-10 bg-white'>
		// 		<Container>
		// 			<div className='flex'>
		// 				<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
		// 					React
		// 				</div>
		// 				<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
		// 					Mobx
		// 				</div>
		// 				<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
		// 					Tanstack / React-query
		// 				</div>
		// 				<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
		// 					Express
		// 				</div>
		// 				<div className='bg-gray-500 text-white rounded-full flex justify-center items-center text-center mr-2 px-2'>
		// 					Prisma
		// 				</div>
		// 			</div>
		// 		</Container>
		// 	</section>
		// 	<section className='py-10 bg-white'>
		// 		<Container>
		// 			<h2 className='text-xl py-2'>Идея</h2>
		// 			<p className='py-2'>
		// 				Разработка была основана на интересе создать действительно полезное
		// 				и удобное приложение для занятий в зале, которым я буду пользоваться
		// 				сам, а так как создавать приложение только для себя смысла мало -
		// 				оно стало доступным для всех
		// 			</p>
		// 			<p className='py-2'>
		// 				Стек технологий был в голове изначально - это те технологии, в
		// 				которых я хотел попрактиковаться
		// 			</p>
		// 			<p className='py-2'>
		// 				Mobx был выбран в качестве стейт менеджера потому что он удобен для
		// 				небольших приложений. По сравнению с тем же redux, чтобы создать
		// 				стор не нужно писать много бойлерплейта
		// 			</p>
		// 			<p className='py-2'>
		// 				В качестве ORM была выбрана Prisma по нескольким причинам:
		// 			</p>
		// 			<ul className=' list-disc pl-5'>
		// 				<li>Удобство использования</li>
		// 				<li>Популярность</li>
		// 			</ul>
		// 		</Container>
		// 	</section>
		// </>
		<div>
			<div>
				{projectStore?.project?.content?.sections?.map(section => {
					return (
						<section
							key={section.id}
							style={{
								background: `url(${section.background})`,
								padding: section.paddings ?? '2.5rem 0',
							}}
						>
							<Container>
								{section.blocks?.map(block => {
									switch (block.type) {
										case 'h1':
											return (
												<h1
													className={`text-4xl font-bold mb-5`}
													style={{ color: block.color }}
													key={block.id}
												>
													{block.text}
												</h1>
											)
										case 'h2':
											return (
												<h2
													className={`text-xl font-bold`}
													style={{ color: block.color }}
													key={block.id}
												>
													{block.text}
												</h2>
											)
										case 'p':
											return (
												<p
													className='py-2'
													key={block.id}
													style={{ color: block.color }}
												>
													{block.text}
												</p>
											)
										case 'list':
											return (
												<ul
													className='list-disc pl-5'
													key={block.id}
													style={{ color: block.color }}
												>
													{block.items?.map((item, key) => (
														<li key={key}>{item}</li>
													))}
												</ul>
											)
									}
								})}
							</Container>
						</section>
					)
				})}
			</div>
		</div>
	)
}

export default observer(Project)
