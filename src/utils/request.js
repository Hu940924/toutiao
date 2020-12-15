/* 
  封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基准路径
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function(response) {
    return response
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function(error) {
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const { user } = store.state
      if (!user || !user.refresh_token) {
        // 代码不要往后执行了
        return router.push('/login')
      }
      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`,
          },
        })
        // 如果获取成功，则把新的 token 更新到容器中
        store.commit('setUser', {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token, // 还是原来的 refresh_token
        })
        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (error) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷线 token 失败', err)
        router.push('/login')
      }
    }
    // return Promise.reject(error)
    return Promise.resolve(error.response)
  }
)

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
