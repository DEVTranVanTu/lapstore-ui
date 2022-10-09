import { Brand } from '@Models/index'
import axiosClient from './axiosClient'

const cartApi = {
  getCart(): Promise<Brand[]> {
    const url = '/brands'
    return axiosClient.get(url)
  },
}

export default cartApi
