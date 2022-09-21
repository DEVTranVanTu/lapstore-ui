export interface Review {
  userName: string
  userAvatar?: string
  userId: string
  product: string
  review: string
  rating: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ResponseAddReview {
  success: boolean
  message: string
  data: {
    userName: string
    userAvatar?: string
    userId: string
    product: string
    review: string
    rating: number
    createdAt?: Date
    updatedAt?: Date
  }
}
