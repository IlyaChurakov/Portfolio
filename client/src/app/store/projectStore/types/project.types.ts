export interface IProject {
	id: string
	updatedAt: Date
	createdAt: Date

	name: string
	previewImage: string | null
	archived?: boolean
	labels?: string[]

	sections: ISection[]
}

export interface ISection {
	id: string
	updatedAt?: Date
	createdAt?: Date

	name: string
	backgroundPath: string | null
	paddings?: string

	blocks: IBlock[]
}

export interface IBlock {
	id: string
	updatedAt?: Date
	createdAt?: Date

	type: string
	text?: string
	color?: string
	items?: string[]
	imgPath: string | null
	imgDescr?: string

	sectionId: string
}

export enum BlockTypes {
	h1 = 'Заголовок',
	p = 'Основной текст',
	img = 'Изображение',
	list = 'Список',
}

export enum BlockTypesText {
	Заголовок = 'h1',
	'Основной текст' = 'p',
	Изображение = 'img',
	Список = 'list',
}

export enum ColorTypes {
	white = '#FFF',
	black = '#171717',
	purple = '#9255E8',
	red = '#C24D51',
	green = '#419B41',
	grey = '#6F7680',
	'grey-dark' = '#232426',
}

export type BlockModalInputs = {
	type: string
	text: string
	color: string
	image: FileList
	imgDescr: string
}

export type SectionModalInputs = {
	name: string
	background: FileList
	paddings: string
}

export type blockData = BlockModalInputs &
	IBlock & { sectionId: string } & { image: string | undefined }

export type SectionData = SectionModalInputs &
	ISection & { background: string | undefined }
