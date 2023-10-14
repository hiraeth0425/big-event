<script setup>
import { ref } from 'vue'
import pageContainer from '@/components/pageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { updateUserPhotoService } from '@/api/user.js'

const UserStore = useUserStore()
const uploadRef = ref()
const imgUrl = ref(UserStore.userInfo.user_pic)

// 預覽圖片
const handleChange = async (uploadFile) => {
  // imgUrl.value = URL.createObjectURL(uploadFile.raw) //預覽圖片
  // 基於FileReader 讀取圖片做預覽
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = async () => {
    imgUrl.value = reader.result
    // console.log(imgUrl.value)
  }
}
// 發送請求更新頭像
const onUploadAvatar = async () => {
  await updateUserPhotoService(imgUrl.value)
  // userStore 重新渲染
  await UserStore.UserInfoAction()
  // 提示用戶
  ElMessage.success('頭像更新成功')
}
</script>
<template>
  <pageContainer title="更換頭像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
      style="margin-bottom: 30px"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button
      @click="uploadRef.$el.querySelector('input').click()"
      type="primary"
      size="large"
      :icon="Plus"
      >選擇圖片</el-button
    >
    <el-button
      type="success"
      size="large"
      :icon="Upload"
      @click="onUploadAvatar"
      >上傳頭像</el-button
    >
  </pageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
