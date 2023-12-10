export const apiConfig = {
	auth: {
		register: () => `/auth/register`,
		login: () => `/auth/login`,
		logout: () => `/auth/logout`,
		refresh: () => `/auth/refresh`,
	},
	user: {
		all: () => `/user/`,
		delete: (id: number) => `/user/${id}`,
		deleteRole: (id: number) => `/user/delete-role/${id}`,
		addRole: (id: number) => `/user/add-role/${id}`,
		activate: (link: string) => `/user/activate/${link}`,
		uploadAvatar: (id: number) => `/user/upload-avatar/${id}`,
		addDescription: (id: number) => `/user/change-description/${id}`,
	},
	projects: {
		all: () => `/projects/`, // delete
		last: (count: number = 1) => `/projects/last/${count}`,
		one: (id: string) => `/projects/${id}`, // delete
		uploadPreview: (id: string) => `/projects/upload-preview/${id}`,
		uploadImage: () => `/projects/upload-image`,
		save: () => `/projects/save`,
		create: (name: string) => `/projects/${name}`,
	},
}
