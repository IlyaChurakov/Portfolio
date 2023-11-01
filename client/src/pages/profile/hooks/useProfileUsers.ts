import { useQuery } from '@tanstack/react-query'
import $axios from '../../../http'
import { UserResponse } from '../../../models/response/UsersResponse'

const useProfileUsers = () => {
	return useQuery<UserResponse[]>({
		queryKey: ['get users'],
		queryFn: () => $axios.get<UserResponse[]>('/user').then(res => res.data),
	})
}

export default useProfileUsers
