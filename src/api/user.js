import request from '@/utils/request.js'

// 註冊接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

// 登入接口
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 獲取用戶信息
export const getUserInfoService = () => request.get('/my/userinfo')

// 更新用戶信息
export const updateUserInfoService = ({ id, nickname, email }) =>
  request.put('/my/userinfo', { id, nickname, email })

// 更新用戶頭像
export const updateUserPhotoService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新用戶密碼
export const updateUserPasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
