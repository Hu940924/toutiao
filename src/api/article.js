// 文章请求模块
import { Get } from '@/utils/request'

// 获取文章列表数
export const getArticles = (params) => {
  return Get('/app/v1_1/articles', params)
}
