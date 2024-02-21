export const apiConfig = {
	auth: {
		register: () => `/auth/register`,
		login: () => `/auth/login`,
		logout: () => `/auth/logout`,
		refresh: () => `/auth/refresh`,
	},
	user: {
		all: () => `/user/`,
		deleteAccount: (id: string) => `/user/${id}`,
		deleteRole: (id: string) => `/user/delete-role/${id}`,
		addRole: (id: string) => `/user/add-role/${id}`,
		activate: (link: string) => `/user/activate/${link}`,
		uploadAvatar: (id: string) => `/user/upload-avatar/${id}`,
		addDescription: (id: string) => `/user/change-description/${id}`,
	},
	projects: {
		all: () => `/projects`,
		last: (count: number = 1) => `/projects/last/${count}`,
		one: (id: string) => `/projects/${id}`, // delete
		assignPreview: (id: string) => `/projects/assign-preview/${id}`,
		uploadImage: () => `/projects/upload-image`,
		save: () => `/projects/save`,
		create: (name: string) => `/projects/${name}`,
	},
}
