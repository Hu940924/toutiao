// 用户相关请求模块

// import request from '@/utiles/request'

import request, { Get, Delete, Post, Put } from '@/utiles/request'

// 用户登陆
export const login = (data) => {
  return Post('/app/v1_0/authorizations', data)
}

// 获取验证码
export const getSendSms = (data) => {
  return Get(`/app/v1_0/sms/codes/${data}`)
}
