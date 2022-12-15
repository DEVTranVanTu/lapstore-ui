import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getAuthToken } from 'utils'

const axiosClient = axios.create({
  baseURL: 'https://shop-tutran.site/backend/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const token = getAuthToken()
    if (config.headers === undefined) {
      config.headers = {}
    }
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (401 === error.response.status) {
      // handle error
      return Promise.reject(error)
    } else {
      return Promise.reject(error)
    }
  }
)

export default axiosClient
