import { Inventory } from '@Models/index'
import axiosClient from './axiosClient'
const inventoryApi = {
  getAll(params: object): Promise<Inventory[]> {
    const url = '/inventory'
    console.log('params',params);
    
    return axiosClient.get(url,{params})
  },
  getById(id: string): Promise<Inventory> {
    const url = `/inventory/${id}`
    return axiosClient.get(url)
  },
}

export default inventoryApi
