import fs from 'fs'
import path from 'path'

export default {
	deleteFiles: async files => {
		for (let fileName of files) {
			const filePath = path.resolve('static', fileName)
			fs.unlink(filePath, err => {
				if (err) throw err
				console.log('Deleted')
			})
		}
	}
}
