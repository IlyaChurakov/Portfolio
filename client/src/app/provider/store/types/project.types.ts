export interface IProject {
	id: string
	name: string
	updatedAt: Date
	createdAt: Date
	content: IContent
	previewImage?: string
	archived?: boolean
	labels?: string[]
}

export interface IContent {
	sections: ISection[]
}

export interface ISection {
	id: string
	name: string
	background?: string
	blocks?: IBlock[]
	paddings?: string
}

export interface IBlock {
	id: string
	type: string
	text?: string
	color?: string
	items?: string[]
	imgPath?: string
	imgDescr?: string
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

export type Inputs = {
	type: string
	text: string
	color: string
	image: FileList
	imgDescr: string
}

export type SectionInputs = {
	name: string
	background: string
	paddings: string
}
