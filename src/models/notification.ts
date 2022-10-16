export interface Notification {
  _id?: string
  userId: string
  image: string
  typeOfNotification: string
  status: string
  message: string
  idToReview: string
  createdAt?: Date
}

export interface ResponseNotification {
  success: boolean
  message: string
  data: Notification[]
}
