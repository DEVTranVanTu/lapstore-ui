import { ResponseAddReview, Review } from '@Models/review'
import axiosClient from './axiosClient'
const reviewApi = {
  addReview(data: Review): Promise<ResponseAddReview> {
    const url = '/review'
    return axiosClient.post(url, data)
  },
  getReviewByProductId(id: string): Promise<Review[]> {
    const url = `/review/PD/${id}`
    return axiosClient.get(url)
  },
}

export default reviewApi
