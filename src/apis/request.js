import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  timeout: 5000
})

request.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (res.data && res.data.error) {
    Message.error(res.data.message)
  }
  return res.data
}, function (err) {
  // 对响应错误做点什么
  Message.error(err.message)
  return Promise.reject(err)
})

export default request
