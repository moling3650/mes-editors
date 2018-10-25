import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://localhost:60767/api/',
  timeout: 5000
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data
}, error => {
  // 对响应错误做点什么
  Message.error(error.message)
  return Promise.reject(error)
})

export default instance.request
