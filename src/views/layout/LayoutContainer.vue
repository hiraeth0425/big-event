<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const UserStore = useUserStore()
onMounted(async () => {
  await UserStore.UserInfoAction()
})
const { nickname, user_pic, username } = UserStore.userInfo

// 下拉菜單的配置 路由跳轉 退出登入
const router = useRouter()
const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你確認要退出嗎', {
      confirmButtonText: '確認',
      cancelButtonText: '取消',
      type: '溫馨提示'
    })
    // 清除 token 和 用戶信息
    UserStore.removeToken()
    UserStore.changeUserInfo({})
    router.push('/login')
  } else {
    // 跳轉頁面
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <!-- 
    el-menu 整個菜單組件
      :default-active="$route.path" 配置默認高亮的菜單項
      router router選項開啟. el-menu-item 的index 就是點擊跳轉的路徑

    el-menu-item 菜單項
      index="/article/channel" 配置的是訪問的跳轉路徑, 配合default-active的值, 實現高亮
   -->
  <el-container class="layout-container">
    <!-- 側邊欄 -->
    <!-- 測試布局 -->
    <el-row>
      <el-col :xs="0">
        <el-aside style="height: 100%">
          <div class="el-aside__logo"></div>
          <!-- 主要區域容器 -->
          <el-menu
            active-text-color="#ffd04b"
            background-color="#232323"
            :default-active="$route.path"
            text-color="#fff"
            router
          >
            <el-menu-item index="/article/channel">
              <el-icon><Management /></el-icon>
              <span>文章分類</span>
            </el-menu-item>
            <el-menu-item index="/article/manage">
              <el-icon><Promotion /></el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-sub-menu index="/user">
              <!-- 多級菜單的標題 - 具名插槽 title -->
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>個人中心</span>
              </template>
              <!-- 展開的內容 - 默認插槽 -->
              <el-menu-item index="/user/profile">
                <el-icon><User /></el-icon>
                <span>基本資料</span>
              </el-menu-item>
              <el-menu-item index="/user/avatar">
                <el-icon><Crop /></el-icon>
                <span>更換頭像</span>
              </el-menu-item>
              <el-menu-item index="/user/password">
                <el-icon><EditPen /></el-icon>
                <span>重置密碼</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
      </el-col>
    </el-row>
    <el-container>
      <!-- 頭部 -->
      <!-- 測試布局 -->
      <el-row>
        <el-col>
          <el-header>
            <div>
              歡迎你回來 <strong>{{ nickname || username }}</strong>
            </div>
            <!-- 下拉菜單 展示給用戶, 默認看到的 -->
            <el-dropdown placement="bottom-end" @command="handleCommand">
              <span class="el-dropdown__box">
                <el-avatar :src="user_pic || avatar" />
                <el-icon><CaretBottom /></el-icon>
              </span>
              <template #dropdown>
                <!-- 摺疊的下拉部分 -->
                <el-dropdown-menu>
                  <el-dropdown-item command="profile" :icon="User"
                    >基本資料</el-dropdown-item
                  >
                  <el-dropdown-item command="avatar" :icon="Crop"
                    >更換頭像</el-dropdown-item
                  >
                  <el-dropdown-item command="password" :icon="EditPen"
                    >重置密碼</el-dropdown-item
                  >
                  <el-dropdown-item command="logout" :icon="SwitchButton"
                    >退出登入</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-header>
        </el-col>
      </el-row>
      <!-- 測試布局 -->
      <el-row>
        <el-col>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-col>
      </el-row>

      <!-- 底欄容器 -->
      <el-footer>大事件 ©2023 Created</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
