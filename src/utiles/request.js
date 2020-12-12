/* 
  封装 axios 请求模块
 */
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基准路径
})

// get 请求
export const Get = (url, data) => {
  return request.get(url, {
    params: data,
  })
}

// delete 请求
export const Delete = (url, data) => {
  return request.delete(url, {
    params: data,
  })
}

// post 请求
export const Post = (url, data) => {
  return request.post(url, data)
}

// put 请求
export const Put = (url, data) => {
  return request.put(url, data)
}

export default request
