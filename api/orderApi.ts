import axiosClient from './axiosClient'

const orderApi = {
  payment(data: any) {
    const url = '/order/payment'
    return axiosClient.post(url, data)
  },
}

export default orderApi
