import { AuthData, AuthResponse } from '@Models/user'
import axiosClient from './axiosClient'

const userApi = {
  login(data: AuthData): Promise<AuthResponse> {
    const url = '/auth/login'
    return axiosClient.post(url, data)
  },
}

export default userApi
