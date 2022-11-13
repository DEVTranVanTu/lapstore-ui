export type spec = {
  key: string
  value: any
}

export interface Product {
  _id?: string
  productName: string
  productThumbnail: string
  description: string
  inventory?: string
  price: number
  rating: number
  discount: number
  status: number
  quantity: number
  comment: number
  specs: spec[]
  createdAt?: Date
  updatedAt?: Date
}

export interface topProduct {
  productDetail: Product
  quantity: Number
  rating: number
}
