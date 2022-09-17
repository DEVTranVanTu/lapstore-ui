import { Category, CategoryNav } from '@Models/index'
import axiosClient from './axiosClient'

const categoryApi = {
  getAll(): Promise<Category[]> {
    const url = '/category'
    return axiosClient.get(url)
  },
  getAllNav(): Promise<CategoryNav[]> {
    const url = '/category/nav'
    return axiosClient.get(url)
  },

  getById(id: string): Promise<Category> {
    const url = `/Categories/${id}`
    return axiosClient.get(url)
  },

  add(data: Category): Promise<Category> {
    const url = '/categories'
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

export default categoryApi
