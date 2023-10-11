<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'

const drawer = ref(false)

// 發布文章 默認數據
const defaultForm = {
  title: '', // 文章標題
  cate_id: '', // 文章分類id
  content: '', // 文章內容
  cover_img: '', // 文章封面
  state: '' // 文章狀態 => 已發布 草稿
}
// 發布文章 表單數據
const postFromModel = ref({ ...defaultForm })

const rules = {
  title: [
    {
      required: true,
      message: '請輸入文章標題',
      trigger: 'blur'
    }
  ],
  cate_id: [
    {
      required: true,
      message: '請選擇文章分類',
      trigger: 'blur'
    }
  ]
}

const open = (row) => {
  drawer.value = true
  console.log(row)
  if (row.id) {
    // 需要基於 row.id 發送請求, 獲取編輯對應的詳情數據, 進行回顯
    // console.log('編輯回顯')
  } else {
    postFromModel.value = { ...defaultForm } // 基於默認的數據, 重置form數據
    // console.log('添加')
  }
}

// 圖片上傳邏輯
const imgUrl = ref('')

const onSelectPic = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //預覽圖片
}

defineExpose({
  open
})

/***
 * 目標: 完善表單結構
 *  1. 準備數據
 *   // 思路 從子組件發請求 postFromModel傳參
 *   // open方法 => 添加 重置表單數據 (空的表單)
 *                  編輯 基於row 獲取對應 row 回顯 (img, content 另外處理)
 *  2. 準備form表單結構
 *  3. 一打開默認重置添加的from表單數據
 *  4. 擴展下拉菜單 width (props)
 * * */
</script>

<template>
  <!-- 抽屜 -->
  <el-drawer
    v-model="drawer"
    :title="postFromModel.cate_id ? '編輯文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 表單開始 -->
    <el-form :model="postFromModel" :rules="rules" style="margin-left: 20px">
      <el-form-item label="文章標題" prop="title">
        <el-input
          placeholder="請輸入標題"
          v-model="postFromModel.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章分類" prop="cate_id">
        <ChannelSelect
          v-model="postFromModel.cate_id"
          width="100%"
        ></ChannelSelect>
      </el-form-item>
      <!-- 文章封面 -->
      <el-form-item label="文章封面">
        <!-- 此處需要關閉 element-plus 的自動上傳, 不需要配置 action 等參數
             只需要做前端的本地預覽圖片即可, 無須再提交前上船圖標
        -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectPic"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 文章內容 -->
      <el-form-item label="文章內容">富文本編輯器</el-form-item>
      <el-button type="primary">發布</el-button>
      <el-button type="info">草稿</el-button>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
