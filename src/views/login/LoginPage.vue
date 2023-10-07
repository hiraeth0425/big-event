<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isRegister = ref(true)

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
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
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
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登入相關表單 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
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
