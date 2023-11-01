import { useMutation } from '@tanstack/react-query'
import UserService from '../../../services/User.service'

type hookProps = Function

const useDeleteUser = (refetch: hookProps) => {
	return useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) =>
			UserService.deleteAccount(id).then(() => refetch()),
	})
}

export default useDeleteUser
