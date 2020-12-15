import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对时间的插件
dayjs.extend(relativeTime)

// Dayjs 默认语言是英文，我们这里配置中文
dayjs.locale('zh-cn') // 全局使用

// 过滤时间
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
