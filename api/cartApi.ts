import { Cart } from '@Models/cart'
import { AddToCart } from '../store/slices/cartSlice'
import axiosClient from './axiosClient'

const cartApi = {
  getCart(id: string): Promise<Cart> {
    const url = `/cart/user/${id}`
    return axiosClient.get(url)
  },
  addToCart(data: AddToCart) {
    const url = '/cart'
    return axiosClient.post(url, data)
  },
  removeCartItem(data: any) {
    const url = '/cart/remove'
    return axiosClient.post(url, data)
  },
}

export default cartApi
