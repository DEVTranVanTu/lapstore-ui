export interface Cart {
  _id?: string
  userId: string
  status: string
  modifiedOn?: string
  products: any
  createdAt?: string
  updatedAt?: string
}

export interface cartResponse {
  data: Cart
}
