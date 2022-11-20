export interface shippingAddress {
  shipping_name: string
  shipping_phone: string
  shipping_province: object
  shipping_district: object
  shipping_ward: object
  shipping_address: string
}
export interface Shipping {
  _id?: string
  userId: string
  shipping: shippingAddress[]
  createdAt?: number
  updatedAt?: number
}
