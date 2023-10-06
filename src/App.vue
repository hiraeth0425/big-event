<script setup>
import { useRouter } from 'vue-router'
import { useUserStore, useCountStore } from '@/stores'
const useStore = useUserStore()
const countStore = useCountStore()

// 在Vue3 CompositionAPI中
// 1. 獲取路由對象 router useRouter
//    const router = useRouter()
// 2. 獲取路由參數 route useRoute
//    const route = userRoute()
const router = useRouter()
// const route = useRoute()
const goList = () => {
  router.push('/list')
}
</script>

<template>
  <div>我是App</div>
  <Test-Com></Test-Com>
  <el-button @click="$router.push('/home')">首頁</el-button>
  <el-button @click="goList">列表頁</el-button>
  <hr />

  <div>{{ useStore.token }}</div>
  <el-button @click="useStore.setToken('titti digjerjgerigirjgirg')"
    >登入</el-button
  >
  <el-button @click="useStore.removeToken">退出</el-button>
  <hr />

  <div>{{ countStore.count }}</div>
  <button @click="countStore.addCount(5)">數字+</button>
</template>

<style scoped></style>
