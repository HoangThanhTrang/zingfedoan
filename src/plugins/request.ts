import axios from 'axios'
import { forEach } from 'lodash'
import { Message } from 'element-ui'

const API_URL: string = process.env.VUE_APP_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false
})

request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'


request.interceptors.request.use(request => {
  return request
})

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response || error.response.status >= 500) {
      // error.message = 'Không thể kết nối đến máy chủ'
      error.message = 'Có lỗi kết nối tới máy chủ. Vui lòng thử lại sau ít phút'
      Message.error(error.message)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request
