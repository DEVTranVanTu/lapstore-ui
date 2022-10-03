import axios from 'axios'

interface postImage {
  image: File
}

const uploadApi = {
  postImage({ image }: postImage): Promise<any> {
    const formData = new FormData()
    formData.append('image', image)

    const result = axios.post('http://localhost:5555/api/upload/images', formData, {
      headers: { 'Content-Type': 'image/png' },
    })
    return result
  },
}

export default uploadApi
