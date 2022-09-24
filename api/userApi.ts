import { AuthData, AuthResponse, User } from '@Models/user'
import axiosClient from './axiosClient'

const userApi = {
  login(data: AuthData): Promise<AuthResponse> {
    const url = '/auth/login'
    return axiosClient.post(url, data)
  },
  getUserInfor(id: String): Promise<User> {
    const url = `auth/users/${id}`
    return axiosClient.get(url)
  },
  updateProfile(id: String, data: Object): Promise<User> {
    const url = `auth/users/${id}`
    return axiosClient.post(url, data)
  },
}

export default userApi
