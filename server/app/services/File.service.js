import FileRepository from '../repository/File.repository.js'

class FileService {
	async deleteFiles(files) {
		await FileRepository.deleteFiles(files)
	}
}

export default new FileService()
