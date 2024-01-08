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

export type Inputs = {
	type: string
	text: string
	color: string
	image: File
	imgDescr: string
}
