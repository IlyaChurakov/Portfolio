import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'

type Inputs = {
	name: string
	content: object
}

const AddProject: FC = () => {
	const { projectStore } = useContext(Context)

	const navigate = useNavigate()

	const content = {
		sections: [
			{
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
			},
			{
				bgColor: 'white',
				blocks: [
					{
						type: 'h2',
						text: 'Идея',
					},
					{
						type: 'p',
						text: 'Разработка была основана на интересе создать действительно полезное и удобное приложение для занятий в зале, которым я буду пользоваться сам, а так как создавать приложение только для себя смысла мало - оно стало доступным для всех',
					},
					{
						type: 'p',
						text: 'Стек технологий был в голове изначально - это те технологии, в которых я хотел попрактиковаться',
					},
					{
						type: 'p',
						text: 'Mobx был выбран в качестве стейт менеджера потому что он удобен для небольших приложений. По сравнению с тем же redux, чтобы создать стор не нужно писать много бойлерплейта',
					},
					{
						type: 'p',
						text: 'В качестве ORM была выбрана Prisma по нескольким причинам:',
					},
					{
						type: 'list',
						items: ['Удобство использования', 'Популярность'],
					},
				],
			},
		],
	}

	const { register, control, handleSubmit, watch, setValue } = useForm<Inputs>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<Inputs> = async ({ name, content }: Inputs) => {
		try {
			console.log(name, content)
			// await projectStore.createProject(name, content)
		} catch (e) {
			console.log(e)
		}
	}

	const fields = watch('fields', [])

	const addField = fieldType => {
		const newField = { type: fieldType, value: '' }
		setValue('fields', [...fields, newField])
	}

	const removeField = index => {
		const updatedFields = [...fields]
		updatedFields.splice(index, 1)
		setValue('fields', updatedFields)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid grid-cols-[1fr_250px]'
		>
			<div>
				{content.sections.map(section => {
					return (
						<section
							className={`py-10 bg-[${section.background || section.bgColor}]`}
						>
							<Container>
								{section.blocks.map(block => {
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
												{block.items.map(item => (
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
					<button type='button' onClick={() => addField('text')}>
						Добавить текстовое поле
					</button>
					<button type='button' onClick={() => addField('number')}>
						Добавить числовое поле
					</button>
				</div>
				<button type='submit' className='block m-auto'>
					Сохранить
				</button>
			</nav>
		</form>
	)
}

export default observer(AddProject)
