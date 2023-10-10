<script setup>
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
</script>

<template>
  <!-- App.vue 只需要留一個路由出口即可 -->
  <el-config-provider :locale="zhTw">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
