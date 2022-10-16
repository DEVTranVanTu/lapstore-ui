import { Notification } from '@Models/notification'
import axiosClient from './axiosClient'

const notificationApi = {
  getByUser(id: String): Promise<Notification[]> {
    const url = `/notification/${id}`
    return axiosClient.get(url)
  },
  deleteNotification(id: String) {
    const url = `/notification/${id}`
    return axiosClient.delete(url)
  },
  editNotification(id: String) {
    const url = `/notification/${id}`
    return axiosClient.put(url)
  },
}

export default notificationApi
