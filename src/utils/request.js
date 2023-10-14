import axios from 'axios'
import { useUserStore } from '../stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'https://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1: 基礎地址,超時時間
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // TODO 2: 攜帶token
    const useStore = useUserStore()
    config.headers.Authorization = useStore.token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    // 2xx 范围内的状态码都会触发该函数。
    // TODO 3: 處理業務失敗
    // TODO 4: 摘取核心響應數據
    if (res.data.code === 0) {
      return res
    }
    // 處理業務失敗, 給錯誤題是, 拋出錯誤
    ElMessage.error(res.data.message || '服務異常')
    return Promise.reject(res.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数
    // TODO 5: 處理401錯誤
    // 錯誤的特殊情況 => 401 權限不足 或 token 過期 => 攔截到登入
    if (error.response?.status === 401) {
      router.push('/login')
    }
    // 錯誤的默認情況 => 只要給提示
    ElMessage.error(error.response.data.message || '服務異常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
