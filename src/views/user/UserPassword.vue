<script setup>
import { ref } from 'vue'
import { updateUserPasswordService } from '@/api/user.js'
import pageContainer from '@/components/pageContainer.vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const ruleFormRef = ref()
const ruleForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const checkRePwd = (rules, value, callback) => {
  if (value === ruleForm.value.new_pwd) {
    callback()
  } else {
    callback(new Error('两次输入的新密码不一致'))
  }
}
const router = useRouter()
// 修改密碼
const userStore = useUserStore()
const onUpdatePassword = async () => {
  await ruleFormRef.value.validate()
  await updateUserPasswordService(ruleForm.value)
  ElMessage.success('修改成功')
  // 清除token 和 個人信息
  userStore.removeToken()
  userStore.changeUserInfo({})
  // 跳轉到登入頁面
  router.push('/login')
}
// 清空表單內容
const onResetForm = () => {
  ruleFormRef.value.resetFields()
}
const rules = ref({
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
    // 添加更多原密码的校验规则
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' }
    // 添加更多新密码的校验规则
  ],
  re_pwd: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: checkRePwd, trigger: 'blur' }
  ]
})
</script>
<template>
  <pageContainer title="重置密碼">
    <el-row>
      <el-col :span="12">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
          <el-form-item label="原密碼" prop="old_pwd">
            <el-input v-model="ruleForm.old_pwd"> </el-input>
          </el-form-item>
          <el-form-item label="新密碼" prop="new_pwd">
            <el-input type="password" v-model="ruleForm.new_pwd"> </el-input>
          </el-form-item>
          <el-form-item label="確認新密碼" prop="re_pwd">
            <el-input type="password" v-model="ruleForm.re_pwd"> </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="onUpdatePassword">修改密碼</el-button>
        <el-button @click="onResetForm">重置</el-button>
      </el-col>
    </el-row>
  </pageContainer>
</template>
