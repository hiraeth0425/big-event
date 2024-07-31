<script setup>
import { ArrowDown } from '@element-plus/icons-vue'

const emit = defineEmits(['drawerActive'])
const onSelectMenu = (index) => {
  console.log(index)
  emit('drawerActive')
}
</script>

<template>
  <el-aside style="height: 100%">
    <div class="el-aside__logo"></div>
    <!-- 主要區域容器 -->
    <el-menu
      @click="onSelectMenu"
      active-text-color="#ffd04b"
      background-color="#232323"
      :default-active="$route.path"
      text-color="#fff"
      router
    >
      <el-menu-item index="/article/channel">
        <span>文章分類</span>
      </el-menu-item>
      <el-menu-item index="/article/manage">
        <!-- <el-icon><Promotion /></el-icon> -->
        <span>文章管理</span>
      </el-menu-item>
      <el-sub-menu index="/user">
        <!-- 多級菜單的標題 - 具名插槽 title -->
        <template #title>
          <!-- <el-icon><UserFilled /></el-icon> -->
          <span
            >個人中心<el-icon size="10px"><ArrowDown /></el-icon
          ></span>
        </template>
        <!-- 展開的內容 - 默認插槽 -->
        <el-menu-item index="/user/profile">
          <!-- <el-icon><User /></el-icon> -->
          <span>基本資料</span>
        </el-menu-item>
        <el-menu-item index="/user/avatar">
          <!-- <el-icon><Crop /></el-icon> -->
          <span>更換頭像</span>
        </el-menu-item>
        <el-menu-item index="/user/password">
          <!-- <el-icon><EditPen /></el-icon> -->
          <span>重置密碼</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  background-color: #232323;
  &__logo {
    margin-left: 20px;
    height: 120px;
    background: url('@/assets/logo.png') no-repeat left / 100px auto;
  }
  // .el-menu {
  //   border-right: none;
  // }
}
</style>
