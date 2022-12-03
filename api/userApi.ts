import { AuthData, AuthResponse, User } from '@Models/user'
import axiosClient from './axiosClient'

const userApi = {
  login(data: AuthData): Promise<AuthResponse> {
    const url = '/auth/login'
    return axiosClient.post(url, data)
  },
  verifyEmail(data: any) {
    const url = '/auth/register'
    return axiosClient.post(url, data)
  },
  register(data: any) {
    const url = '/auth/verify'
    return axiosClient.post(url, data)
  },
  getUserInfor(id: String): Promise<User> {
    const url = `auth/users/${id}`
    return axiosClient.get(url)
  },
  updateProfile(id: String, data: Object): Promise<User> {
    const url = `auth/users/${id}`
    const profile = {
      profile: data,
    }
    return axiosClient.post(url, profile)
  },
  getListAdmin() {
    const url = '/auth/users/admin'
    return axiosClient.get(url)
  },
}

export default userApi
