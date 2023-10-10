<script setup>
import { ref } from 'vue'
import { changeArticleClass, addArtcleClass } from '@/api/article.js'

const dialogVisible = ref(false)
const formRef = ref()

const emit = defineEmits(['success'])

// 組件對外暴露的一個方法open, 基於open傳來的參數, 區分添加還是編輯
// open({}) => 表單無需渲染, 說明是添加
// open({ id, cate_name,... }) => 表單需要渲染, 說明是編輯
// open調用後, 可以打開彈窗

const open = async (row) => {
  //   console.log(row)
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 -> 重置了表單內容, 編輯 => 存儲了需要回顯的數據
}

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '請輸入分類名稱', trigger: 'blur' },
    { pattern: /^\S{1,15}$/, message: '必須是1-15位非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '請輸入分類別名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '必須是1-15位英文數字',
      trigger: 'blur'
    }
  ]
}
// 表單進行再次驗證
const onSubmit = async () => {
  //   console.log(11)
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await changeArticleClass(formModel.value)
    ElMessage.success('編輯成功')
  } else {
    await addArtcleClass(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  //   子傳父
  emit('success')
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <!-- dialog -->
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '編輯分類' : '添加分類'"
    width="30%"
  >
    <!-- <span>我是內容</span> -->
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分類名稱" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="請輸入分類名稱"
        ></el-input>
      </el-form-item>
      <el-form-item label="分類別名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="請輸入分類別名"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- dialog 彈窗 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 確認 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
