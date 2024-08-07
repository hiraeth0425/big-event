<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService } from '@/api/user.js'
import { userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const isRegister = ref(false)
const form = ref()
// 註冊 - 整個用於提交的form數據對象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整個表單的校驗規則
// 1. 非空校驗 required: true ,         message消息提示,       trigger觸發校驗的時機 blur change
// 2. 長度校驗 min: xx, max: xx
// 3. 正則校驗 pattern: 正則規則 \S非空字符
// 4. 自定義校驗 => 自己寫邏輯校驗 (校驗函數)
//    validator:(rule, value, callback)
//    (1) rule 當前校驗規則相關的信息
//    (2) value 所校驗的表單元素目前的表單值
//    (3) callback 無論成功還是失敗, 都需要callback 回調
//        - callback() 校驗成功
//        - callback(new Error('錯誤信息'))  校驗失敗
const rules = {
  username: [
    { required: true, message: '請輸入用戶名', trigger: 'blur' },
    { min: 5, max: 10, message: '長度必須是5-10位數', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-15位非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密碼必須是6-15位非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次輸入密碼不一致'))
        } else {
          callback() //就算校驗成功, 也需要callback
        }
      },
      trigger: 'blur'
    }
  ]
}

const register = async () => {
  // 註冊成功之前, 先進行校驗, 校驗成功 -> 請求, 校驗失敗 -> 自動提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('註冊成功')
  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
const remember = ref(false)
const login = async () => {
  // 登入前校驗
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/')
}

// 切換的時候, 重置表單內容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

// 如果userAccount有值, 就把值賦值給formModel
watch(
  userStore.userAccount,
  (newVal) => {
    if (newVal) {
      remember.value = true
      formModel.value = newVal
    }
  },
  { immediate: true }
)

// 記住我 勾選框 變化的時候, 進行本地持久化
const changeRemember = () => {
  if (remember.value === false) {
    // 如果FALSE formModel對象內容清空
    userStore.setUserAccount({})
  } else {
    // 如果TRUE formModel對象內容本地持久化
    userStore.setUserAccount(formModel.value)
  }
}
</script>

<template>
  <!-- 
        1.結構表單相關
            el-row表示一行, 一行分成24份
            el-col表示列
            (1) :span= "12" 代表在一行中, 佔12份(50%)
            (2) :span= "6"  表示在一行中, 佔6份(25%)
            (3) :offset="3" 代表在一行中, 左側margin份數

            el-form 整個表單組件
            el-form-item 表單的一行 (一個表單域)
            el-input 表單元素 (輸入框)
        2.校驗相關
        (1) el-form => :model="ruleForm" 綁定的整個form數據對象  { xxx, xxx, xxx }
        (2) el-form => :rules-"rules"    綁定的整個rules規則對象 { xxx, xxx, xxx }
        (3) 表單元素 => v-model="ruleForm.xxx" 給表單元素, 綁定form的子屬性
        (4) el-form-item => prop配置生效的是哪個校驗規則 (和rules中的字段要對應)
     -->
  <el-row class="login-page">
    <el-col :span="12" :xs="24" class="bg"></el-col>
    <el-col :span="6" :offset="3" :md="6" :xs="18" class="form">
      <!-- 註冊相關表單 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>註冊</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="請再次輸入密碼"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            註冊
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登入相關表單 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登入</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="請輸入用戶名，測試帳號:test666888"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="請輸入密碼，測試密碼:123456"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="remember" @change="changeRemember"
              >記住我</el-checkbox
            >
            <el-link type="primary" :underline="false">忘記密碼?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登入</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            註冊 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
