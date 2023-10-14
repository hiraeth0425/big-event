import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '@/api/user.js'

// 用戶模塊 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用戶信息持久化
    const userInfo = ref({})

    const UserInfoAction = async () => {
      const res = await getUserInfoService()
      userInfo.value = res.data.data
    }

    // 用戶信息更新
    const changeUserInfo = (obj) => {
      userInfo.value = obj
    }

    // 用戶帳號密碼持久化
    const userAccount = ref({})
    const setUserAccount = (obj) => {
      userAccount.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      UserInfoAction,
      changeUserInfo,
      userAccount,
      setUserAccount
    }
  },
  {
    persist: true
  }
)
