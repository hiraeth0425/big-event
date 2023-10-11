<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getPublishService } from '@/api/article.js'
import { ElMessage } from 'element-plus'

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

// 圖片上傳邏輯
const imgUrl = ref('')
const onSelectPic = (uploadFile) => {
  // console.log(uploadFile)
  imgUrl.value = URL.createObjectURL(uploadFile.raw) //預覽圖片
  postFromModel.value.cover_img = uploadFile.raw
}

// 發布 和 草稿 點擊事件
// const formModel = ref('')
const emit = defineEmits(['success'])

const onPublish = async (state) => {
  // 將已發布還是草稿狀態, 存入postFromModel
  postFromModel.value.state = state
  // 注意: 當前接口, 需要的是 formData 對象
  // 將普通對象 => 轉換成 => formData對象
  const fd = new FormData()
  for (let key in postFromModel.value) {
    fd.append(key, postFromModel.value[key])
  }
  // 發請求
  if (postFromModel.value.id) {
    // 編輯操作
  } else {
    // 添加操作
    await getPublishService(fd) // 必須發formData 對象
    drawer.value = false
    ElMessage.success('添加成功')
    // 通知父組件, 添加成功了
    emit('success', 'add')
  }
}

const edittorRef = ref()
const open = (row) => {
  drawer.value = true
  // console.log(row)
  if (row.id) {
    // 需要基於 row.id 發送請求, 獲取編輯對應的詳情數據, 進行回顯
    // console.log('編輯回顯')
  } else {
    postFromModel.value = { ...defaultForm } // 基於默認的數據, 重置form數據
    // console.log('添加')
    // 這裡重置了表單的數據, 但是圖片上傳的img地址, 富文本編輯器內容 => 需要手動重置
    imgUrl.value = ''
    edittorRef.value.setHTML('')
  }
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
/***
 * 目標: 添加文章功能
 *  1. 封裝添加接口
 *  2. 註冊點擊事件調用
 *  3. 父組件監聽事件, 重新渲染
 *  4. 添加編輯完成後的內容重置
 *  (可以自己實現的功能 => 表單提交驗證 圖片和富文本 非空驗證)
 * */
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
    <el-form
      ref="formModel"
      :model="postFromModel"
      :rules="rules"
      style="margin-left: 20px"
    >
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
      <el-form-item label="文章內容">
        <!-- 富文本編輯器 -->
        <div class="editor">
          <QuillEditor
            ref="edittorRef"
            theme="snow"
            v-model:content="postFromModel.content"
            contentType="html"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-button @click="onPublish('已发布')" type="primary">發布</el-button>
      <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
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
// 富文本編輯器
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
