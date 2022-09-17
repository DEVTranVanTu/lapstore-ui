import { subCategory } from "./subCategory"

export interface Category {
  _id?: string
  categoryName: string
  createdAt?: number
  updatedAt?: number
}

export interface CategoryNav{
  _id: string
  categoryName: string
  subCategory:subCategory[]
}