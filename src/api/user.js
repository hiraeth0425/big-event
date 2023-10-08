import request from '@/utils/request.js'

// 註冊接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 獲取用戶信息
export const getUserInfoService = () => request.get('/my/userinfo')
