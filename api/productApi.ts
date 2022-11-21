import { Product, topProduct } from '@Models/index'
import axiosClient from './axiosClient'
const productApi = {
  getAll(params: object) {
    const url = '/products'
    return axiosClient.get(url, { params })
  },

  getTopProducts(): Promise<topProduct[]> {
    const url = '/products/selling/top'
    return axiosClient.get(url)
  },

  getTopDiscount(): Promise<Product[]> {
    const url = '/products//selling/top_discount'
    return axiosClient.get(url)
  },

  getAllSub(id: string, params: object): Promise<Product[]> {
    const url = `/products/sub/${id}`
    return axiosClient.get(url, { params })
  },

  getById(id: string): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },

  add(data: Product): Promise<Product> {
    const url = '/products'
    return axiosClient.post(url, data)
  },
}

export default productApi
