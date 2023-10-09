<script setup>
import { ref } from 'vue'
import { getArticleClass, derArticleClass } from '@/api/article.js'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// loading
const loading = ref(false)

// 獲取文章分類請求
const articleList = ref([])

const getArticleList = async () => {
  loading.value = true
  const res = await getArticleClass()
  articleList.value = res.data.data
  // articleList.value = []
  loading.value = false
  // console.log(articleList.value)
}
getArticleList()

// 編輯, 刪除 按鈕
const handleDel = async (row) => {
  // console.log(row, $index)
  ElMessageBox.confirm('你確認要刪除嗎?', '溫馨提示', {
    confirmButtonText: '確認',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await derArticleClass(row.id)
  ElMessage.success('刪除成功')
  getArticleList()
}
const handleEdit = (row) => {
  // console.log(row, $index)
  dialog.value.open(row)
}

// 彈層 dialog 添加分類
const dialog = ref(null)

const addChannel = () => {
  dialog.value.open({})
}

// 子傳父數據處理
const scccessFn = () => {
  getArticleList()
}
</script>
<template>
  <pageContainer title="文章分類">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分類</el-button>
    </template>
    <!-- 主體部分是表格 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column type="index" label="序號" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分類名稱"></el-table-column>
      <el-table-column prop="cate_alias" label="分類別名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- row: channelist 的一項, $index: 下標 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            plain
            :icon="Edit"
            circle
            @click="handleEdit(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            plain
            :icon="Delete"
            circle
            @click="handleDel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="沒有數據"></el-empty>
      </template>
    </el-table>
    <ChannelEdit @success="scccessFn" ref="dialog"></ChannelEdit>
  </pageContainer>
</template>

<style scoped lang="less"></style>
