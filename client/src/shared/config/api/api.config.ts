export const apiConfig = {
	auth: {
		register: () => `/sign-up`,
		login: () => `/sign-in`,
		logout: () => `/logout`,
		refresh: () => `/refresh`,
	},
	user: {
		all: () => `/user/`,
		deleteAccount: (id: string) => `/user/${id}`,
		changeUserRole: (id: string) => `/user/change-role/${id}`,
		activate: (link: string) => `/user/activate/${link}`,
		uploadAvatar: (id: string) => `/user/assign-avatar/${id}`,
		addDescription: (id: string) => `/user/change-description/${id}`,
		update: () => `/user/update`,
		resetMail: () => `/user/reset-mail`,
		changePassword: () => `/user/change-password`,
		deleteFiles: () => `/projects/files`,
	},
	projects: {
		projects: (type: string, count?: number) =>
			`/projects?type=${type}${count ? '&count=' + count : ''}`,
		one: (id: string) => `/projects/${id}`, // delete
		assignPreview: (id: string) => `/projects/assign-preview/${id}`,
		uploadImage: () => `/projects/upload-image`,
		save: () => `/projects/save`,
		create: (name: string) => `/projects/${name}`,
		archive: () => `/projects/archive`,
	},
	mail: {
		contact: () => '/mail/contact',
	},
}
