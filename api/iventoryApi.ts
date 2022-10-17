import { Inventory, Params, Product } from '@Models/index'
import axiosClient from './axiosClient'
const inventoryApi = {
  getAll(params: object): Promise<Inventory[]> {
    const url = '/inventory'
    return axiosClient.get(url, { params })
  },
  getById(id: string): Promise<Inventory> {
    const url = `/inventory/${id}`
    return axiosClient.get(url)
  },
  search(keyword: string, params: Params): Promise<Product[]> {
    const url = `/inventory/search?search="${keyword}"`
    return axiosClient.get(url, { params })
  },
  getByBrand(id: string, params: Params): Promise<Product[]> {
    const url = `/inventory/brand/${id}`
    return axiosClient.get(url, { params })
  },
}

export default inventoryApi
