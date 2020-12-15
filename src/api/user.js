// 用户相关请求模块

// import request from '@/utiles/request'

import request, { Get, Delete, Post, Put } from '@/utils/request'

// 用户登陆
export const login = (data) => {
  return Post('/app/v1_0/authorizations', data)
}

// 获取验证码
export const getSendSms = (data) => {
  return Get(`/app/v1_0/sms/codes/${data}`)
}

// 获取用户信息
export const getUserInfo = () => {
  return Get(`/app/v1_0/user`)
}

// 获取用户频道列表
export const getUserChannels = () => {
  return Get('/app/v1_0/user/channels')
}
