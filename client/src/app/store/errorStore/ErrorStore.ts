import { makeAutoObservable } from 'mobx'
import { RootStore } from '../rootStore'

export class ErrorStore {
	rootStore: RootStore

	errors: string[]

	constructor(rootStore: RootStore) {
		makeAutoObservable(this)

		this.rootStore = rootStore

		this.errors = []
	}

	async add(err: string | undefined) {
		if (!err) return

		this.errors.push(err)

		setTimeout(() => {
			this.errors.shift()
		}, 3000)
	}
}
