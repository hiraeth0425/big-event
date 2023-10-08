import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores'

// createRouter 創建路由實例
// 配置 history模式
// 1. history模式: createWebHistory     地址欄不帶 #
// 2. hash模式:    createWebHashHistory 地址欄帶 #

// vite 中的環境變量 import.meta.env.BASE.URL 就是 vite.config.js 中的 base 配置項
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登入頁
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: 'article/manage',
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/ArticleMange.vue')
        },
        {
          path: 'article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: 'user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: 'user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        }
      ]
    }
  ]
})

// 全局前置守衛 登入訪問攔截
// 根據返回值決定, 是放行還是攔截
// 返回值:
// 1. underfined / true 直接放行

router.beforeEach(async (to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') {
    return '/login'
  }
  return true
})

export default router
