import { v4 as uuidv4 } from 'uuid'
import { IProject } from '../../../models/IProject'

export const addSection = (name: string | null) => {
	if (typeof name == 'string') {
		const project = { ...(projectStore.project as IProject) }

		project.content?.sections?.push({
			id: uuidv4(),
			name,
		})

		projectStore.setProject(project)
	}
}

export const addText = (id: string, text: string | null) => {
	const type = 'p'
	const project = { ...(projectStore.project as IProject) }

	project.content.sections.forEach(section => {
		if (section.id === id) {
			if (section.blocks) {
				section.blocks.push({ id: uuidv4(), type, text: text || '' })
			} else {
				section.blocks = []
				section.blocks.push({ id: uuidv4(), type, text: text || '' })
			}
		}
	})

	projectStore.setProject(project)
}

export const deleteSection = (id: string | number) => {
	const project = { ...(projectStore.project as IProject) }

	const newSections = project.content.sections.filter(
		section => section.id !== id
	)

	const newProject = { ...project }
	newProject.content.sections = newSections

	projectStore.setProject(newProject)
}

export const changeBlock = (
	sectionId: string,
	blockId: string,
	text: string
) => {
	const project = { ...(projectStore.project as IProject) }

	project.content.sections.forEach(section => {
		if (section.id === sectionId) {
			section.blocks?.forEach(block => {
				if (block.id == blockId) {
					block.text = text
				}
			})
		}
	})

	projectStore.setProject(project)
}

export const deleteBlock = (sectionId: string, blockId: string) => {
	const project = { ...(projectStore.project as IProject) }

	project.content.sections.forEach(section => {
		if (section.id === sectionId) {
			section.blocks?.forEach((block, index) => {
				if (block.id == blockId) {
					section.blocks?.splice(index, 1)
				}
			})
		}
	})

	projectStore.setProject(project)
}
