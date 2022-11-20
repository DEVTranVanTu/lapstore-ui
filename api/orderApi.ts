import { Params } from '@Models/common'
import axiosClient from './axiosClient'

const orderApi = {
  payment(data: any) {
    const url = '/order/payment'
    return axiosClient.post(url, data)
  },
  listOrder(id: String, params: Params) {
    const url = `/order/list/${id}`
    return axiosClient.get(url, { params })
  },
  cancelOrder(id: String) {
    const url = `/order/cancel/${id}`
    return axiosClient.delete(url)
  },
  changeShipping(id: String, data: any) {
    const url = `/order/address/${id}`
    return axiosClient.put(url, data)
  },
}

export default orderApi
