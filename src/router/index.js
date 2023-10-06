import { createRouter, createWebHistory } from 'vue-router'

// createRouter 創建路由實例
// 配置 history模式
// 1. history模式: createWebHistory     地址欄不帶 #
// 2. hash模式:    createWebHashHistory 地址欄帶 #

// vite 中的環境變量 import.meta.env.BASE.URL 就是 vite.config.js 中的 base 配置項
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
