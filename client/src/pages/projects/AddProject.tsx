import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Container from '../../layouts/Container'
import Section from './components/Section'
// import { Context } from '../../main'

type Inputs = {
	name: string
	content: object
}

interface IBlock {
	id: string
	type: string
	text?: string
	color?: string
	items?: string[]
}

export interface ISection {
	id: string
	name: string
	background?: string
	blocks?: IBlock[]
}

interface IContent {
	name: string
	sections: ISection[]
}

const AddProject: FC = () => {
	// const { projectStore } = useContext(Context)

	// const navigate = useNavigate()

	const [content, setContent] = useState<IContent>({
		name: 'project',
		sections: [
			{
				id: 'jnldfngdfg',
				name: 'promo',
				background:
					'url(https://dalectricotraining.files.wordpress.com/2018/09/cabezote.jpg)',
				blocks: [
					{
						id: 'kfgnsdfgnpodf',
						type: 'h1',
						text: 'PersonalTrainer',
						color: '#fff',
					},
					{
						id: 'fo[ekr[pgoje',
						type: 'h2',
						text: 'Приложение для ведения тренировок в зале',
						color: '#fff',
					},
				],
			},
			{
				id: 'gklldjfggdfgd',
				name: 'main',
				background: 'white',
				blocks: [
					{
						id: 'wjfpowe',
						type: 'h2',
						text: 'Идея',
					},
					{
						id: 'kfspfjposd',
						type: 'p',
						text: 'Разработка была основана на интересе создать действительно полезное и удобное приложение для занятий в зале, которым я буду пользоваться сам, а так как создавать приложение только для себя смысла мало - оно стало доступным для всех',
					},
					{
						id: 'pdjspjfpwe',
						type: 'p',
						text: 'Стек технологий был в голове изначально - это те технологии, в которых я хотел попрактиковаться',
					},
					{
						id: 'pajqhdbad',
						type: 'p',
						text: 'Mobx был выбран в качестве стейт менеджера потому что он удобен для небольших приложений. По сравнению с тем же redux, чтобы создать стор не нужно писать много бойлерплейта',
					},
					{
						id: 'qhdhiuzhdfiusdf',
						type: 'p',
						text: 'В качестве ORM была выбрана Prisma по нескольким причинам:',
					},
					{
						id: 'iodwedhowedw',
						type: 'list',
						items: ['Удобство использования', 'Популярность'],
					},
				],
			},
		],
	})

	const { register, control, handleSubmit, watch, setValue } = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ name, content }: Inputs) => {
		console.log(name, content)
	}

	// Добавление секции
	const addSection = ({ name, background, blocks }: Omit<ISection, 'id'>) => {
		const newContent = { ...content }

		newContent.sections.push({
			id: uuidv4(),
			name,
			background,
			blocks: blocks || [],
		})

		setContent(newContent)
	}

	// Добавление текста в секцию
	const addText = (id: string | number, text: string) => {
		const type = 'p'
		const newContent: IContent = { ...content }

		newContent.sections.forEach(section => {
			if (section.id === id) {
				if (section.blocks) {
					section.blocks.push({ id: uuidv4(), type, text })
				} else {
					section.blocks = []
					section.blocks.push({ id: uuidv4(), type, text })
				}
			}
		})

		setContent(newContent)
	}

	const testSection = {
		name: 'test',
		background:
			'url(https://dalectricotraining.files.wordpress.com/2018/09/cabezote.jpg)',
		blocks: [
			{
				type: 'h1',
				text: 'PersonalTrainer',
				color: '#fff',
			},
			{
				type: 'h2',
				text: 'Приложение для ведения тренировок в зале',
				color: '#fff',
			},
		],
	}

	const deleteSection = (id: string | number) => {
		const newSections = content.sections.filter(section => section.id !== id)

		const newContent = { ...content }

		newContent.sections = newSections

		setContent(newContent)
	}

	const changeBlock = (sectionId: string, blockId: string, text: string) => {
		const newContent = { ...content }

		newContent.sections.forEach(section => {
			if (section.id === sectionId) {
				section.blocks?.forEach(block => {
					if (block.id == blockId) {
						block.text = text
					}
				})
			}
		})
		console.log(newContent)

		setContent(newContent)
	}

	const deleteBlock = (sectionId: string, blockId: string) => {
		const newContent = { ...content }

		newContent.sections.forEach(section => {
			if (section.id === sectionId) {
				section.blocks?.forEach((block, index) => {
					if (block.id == blockId) {
						section.blocks?.splice(index, 1)
					}
				})
			}
		})

		setContent(newContent)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid grid-cols-[1fr_350px]'
		>
			<div>
				{content.sections.map(section => {
					return (
						<section
							className={`py-10 bg-[${section.background || section.bgColor}]`}
						>
							<Container>
								{section.blocks?.map(block => {
									if (block.type == 'h1') {
										return (
											<h1
												className={`text-[${block.color}] text-4xl font-bold mb-5`}
											>
												{block.text}
											</h1>
										)
									} else if (block.type == 'h2') {
										return (
											<h2 className={`text-[${block.color}] text-xl font-bold`}>
												{block.text}
											</h2>
										)
									} else if (block.type == 'p') {
										return <p className='py-2'>{block.text}</p>
									} else if (block.type == 'list') {
										return (
											<ul className='list-disc pl-5'>
												{block.items?.map(item => (
													<li>{item}</li>
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
			<nav className='bg-gray-400 p-5'>
				<div>
					<button type='button' onClick={() => addSection(testSection)}>
						Добавить {'<section>'}
					</button>

					<div className='w-full h-[2px] bg-black'></div>

					{content?.sections?.map(section => (
						<Section
							id={section.id}
							onDeleteSection={deleteSection}
							onDeleteBlock={deleteBlock}
							name={section.name}
							blocks={section.blocks}
							addText={() => addText(section.id, prompt())}
							changeBlock={changeBlock}
						/>
					))}
				</div>

				<button type='submit' className='block m-auto'>
					Сохранить
				</button>
			</nav>
		</form>
	)
}

export default observer(AddProject)
