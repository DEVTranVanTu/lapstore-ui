import { Shipping } from '@Models/shipping'
import { addData } from '../store/slices/shippingSlice'
import axiosClient from './axiosClient'

const shippingApi = {
  getByUser(id: String): Promise<Shipping[]> {
    const url = `/shipping/user/${id}`
    return axiosClient.get(url)
  },
  addShippingByUser(data: addData) {
    const url = `/shipping`
    return axiosClient.post(url, data)
  },
}

export default shippingApi
