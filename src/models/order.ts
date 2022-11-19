export interface Order {
  _id?: string
  userId: string
  cartId: string
  shipping: object
  payment: object
  statue: number
  products: any[]
  createdAt?: Date
}

export interface ResponseOrder {
  success: boolean
  message: string
  data: Order[]
}
