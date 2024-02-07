import { IBlock, IProject } from '@app/provider/store/types/project.types'
import { WithLinks } from '@shared/utils/withLinks'
import Container from '../../../shared/layouts/Container'

const defaultSectionPaddings = '2.5rem 0'

const blockTypes: Record<string, (block: IBlock) => JSX.Element> = {
	h1: block => {
		return (
			<h1
				className={`text-4xl font-bold mb-5`}
				style={{ color: block.color }}
				key={block.id}
			>
				{block.text}
			</h1>
		)
	},
	h2: block => {
		return (
			<h2
				className={`text-xl font-bold`}
				style={{ color: block.color }}
				key={block.id}
			>
				{block.text}
			</h2>
		)
	},
	p: block => {
		return (
			<p style={{ color: block.color }} className='py-2' key={block.id}>
				<WithLinks text={block.text} linkStyles={{ color: '#3096CE' }} />
			</p>
		)
	},
	list: block => {
		return (
			<ul
				className='list-disc pl-5'
				key={block.id}
				style={{ color: block.color }}
			>
				{block.items?.map((item, key) => (
					<li key={key}>
						<WithLinks text={item} linkStyles={{ color: '#3096CE' }} />
					</li>
				))}
			</ul>
		)
	},
	img: block => {
		return (
			<div key={block.id}>
				<img
					className='w-[50%] max-h-64 m-auto my-5 object-cover'
					src={`http://localhost:7001/${block.imgPath}`}
					key={block.id}
					alt='img'
				/>
				{block.imgDescr && (
					<p
						className='m-auto flex justify-center'
						style={{ color: block.color }}
					>
						<WithLinks
							text={block.imgDescr}
							linkStyles={{ color: '#3096CE' }}
						/>
					</p>
				)}
			</div>
		)
	},
}

export const renderContent = (project: IProject) => {
	return project.sections?.map(section => (
		<section
			key={section.id}
			style={{
				background: section.backgroundPath
					? `url(${import.meta.env.VITE_API_STATIC_URL}${
							section.backgroundPath
					  })`
					: '',
				padding: section.paddings ?? defaultSectionPaddings,
			}}
		>
			<Container>
				{section.blocks?.map(block => blockTypes[block.type](block))}
			</Container>
		</section>
	))
}
