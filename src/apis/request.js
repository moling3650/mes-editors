import axios from 'axios'

const request = axios.create({
  timeout: 5000
})

request.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  return res.data
}, function (err) {
  // 对响应错误做点什么
  return Promise.reject(err)
})

export default request
