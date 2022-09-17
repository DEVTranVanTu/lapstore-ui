import { Category } from '@Models/index'
import axiosClient from './axiosClient'

const subCategoryApi = {
  getAll(): Promise<Category[]> {
    const url = '/subcategories'
    return axiosClient.get(url)
  },
  getByCT(id: string): Promise<Category[]> {
    const url = `/subcategories/CT/${id}`
    return axiosClient.get(url)
  },
  getById(id: string): Promise<Category> {
    const url = `/subcategories/${id}`
    return axiosClient.get(url)
  },

  add(data: Category): Promise<Category> {
    const url = '/subcategories'
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

export default subCategoryApi
