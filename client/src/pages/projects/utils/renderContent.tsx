import { IContent } from '@app/provider/store/types/project.types'
import { WithLinks } from '@shared/utils/withLinks'
import Container from '../../../shared/layouts/Container'

const defaultSectionPaddings = '2.5rem 0'

export const renderContent = (content: IContent | undefined) => {
	return content?.sections?.map(section => {
		return (
			<section
				key={section.id}
				style={{
					background: section.background ? `url(${section.background})` : '',
					padding: section.paddings ?? defaultSectionPaddings,
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
										style={{ color: block.color }}
										className='py-2'
										key={block.id}
									>
										<WithLinks
											text={block.text}
											linkStyles={{ color: '#3096CE' }}
										/>
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
							case 'img':
								return (
									<>
										<img
											className='w-[50%] max-h-64 m-auto my-5 object-cover'
											src={`http://localhost:7001/${block.imgPath}`}
											key={block.id}
											alt='img'
										/>
										{block.imgDescr && (
											<p
												className='m-auto flex justify-center [&>a]:text-blue'
												style={{ color: block.color }}
											>
												<WithLinks
													text={block.imgDescr}
													linkStyles={{ color: '#3096CE' }}
												/>
											</p>
										)}
									</>
								)
						}
					})}
				</Container>
			</section>
		)
	})
}
