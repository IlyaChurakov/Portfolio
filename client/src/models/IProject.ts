export interface IProject {
	id: string
	name: string
	updatedAt: Date
	createdAt: Date
	content: IContent
}

export interface IContent {
	sections: ISection[]
}

export interface ISection {
	id: string
	name: string
	background?: string
	blocks?: IBlock[]
}

export interface IBlock {
	id: string
	type: string
	text?: string
	color?: string
	items?: string[]
}
