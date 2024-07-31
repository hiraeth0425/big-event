<script setup>
import { ref } from 'vue'
import pageContainer from '@/components/pageContainer.vue'
import { useUserStore } from '@/stores'
import { updateUserInfoService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

// 一進頁面回顯數據
const {
  // 是使用倉庫中數據的初始值(無須響應式) 解構無問題
  UserInfoAction,
  userInfo: { id, username, nickname, email }
} = useUserStore()
const formModel = ref({
  id,
  username,
  nickname,
  email
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户暱稱', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '需要2-10位數非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '請輸入用戶郵箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '請輸入正確的郵箱地址',
      trigger: ['blur', 'change']
    }
  ]
}
const ruleForm = ref()
// 表單提交
const onSubmit = async () => {
  // 等待校驗結果
  await ruleForm.value.validate()
  // 提交修改
  await updateUserInfoService(formModel.value)
  // 通知 user 模塊,進行數據的更新
  // changeUserInfo(formModel.value)
  await UserInfoAction()
  // 提示用戶
  ElMessage.success('修改成功')
  window.location.reload()
}
</script>

<template>
  <pageContainer title="基本資料">
    <!-- 表單部分 -->
    <el-form
      ref="ruleForm"
      :model="formModel"
      :rules="rules"
      style="margin-left: 50px; width: 800px"
    >
      <el-form-item label="登入名稱">
        <el-input disabled v-model="formModel.username"></el-input>
      </el-form-item>
      <el-form-item label="用戶暱稱" prop="nickname">
        <el-input v-model="formModel.nickname" style="width: 1200px"></el-input>
      </el-form-item>
      <el-form-item label="用戶郵箱" prop="email">
        <el-input v-model="formModel.email" style="width: 1200px"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交修改</el-button>
    </el-form>
  </pageContainer>
</template>

<style scoped lang="less">
// el-input {
//   width: 300px;
// }
</style>
