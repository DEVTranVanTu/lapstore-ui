import { Product } from '@Models/index'
import axiosClient from './axiosClient'
const productApi = {
  getAll(): Promise<Product[]> {
    const url = '/products'
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

  // update(data: Partial<Category>): Promise<Category> {
  //   const url = `/categories/${data.id}`
  //   return axiosClient.patch(url, data)
  // },

  // remove(id: string): Promise<any> {
  //   const url = `/categories/${id}`
  //   return axiosClient.delete(url)
  // },
}

export default productApi
