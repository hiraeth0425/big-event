<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { getArticleService, delArticleDetailService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import { ElMessage } from 'element-plus'
import { useDebounceFn } from '@vueuse/core'

const loading = ref(false)
const articleList = ref([]) //文章列表
const totalPage = ref(0) //總條數

const drawer = ref()

// 發布文章
const onPost = useDebounceFn(() => {
  drawer.value.open({})
}, 1500)

// 編輯邏輯
const onEditArticle = useDebounceFn((row) => {
  drawer.value.open(row)
}, 1500)
// 刪除邏輯
const onDelArticle = useDebounceFn(async (row) => {
  // console.log(row)
  await delArticleDetailService(row.id)
  ElMessage.success('刪除成功')
  getArticleData(params.value)
}, 1500)

// 定義請求參數對象
// const cateId = ref(63255)
const params = ref({
  pagenum: 1, // 當前頁碼數
  pagesize: 5, // 數據條數
  cate_id: '',
  state: ''
})

// 獲取文章管理頁面
const getArticleData = async () => {
  loading.value = true
  const res = await getArticleService(params.value)
  loading.value = false
  totalPage.value = res.data.total
  articleList.value = res.data.data
  // console.log(articleList.value)
}
getArticleData()

// 處理分頁邏輯
const onSizeChange = (size) => {
  // console.log('當前每頁條數', size)
  // 只要是每頁條樹變化了, 那麼原本正在訪問的當前頁意義不大了, 數據已經不在那一頁了
  // 重新從第一頁渲染即可
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleData()
}
const onCurrentChange = (page) => {
  // 更新當前頁
  params.value.pagenum = page
  // 基於最新的當前頁, 渲染數據
  getArticleData()
}

// 搜索 和 重置 按鈕邏輯 => 按照最新的條件, 重新檢索, 從第一頁開始檢視
const onSearch = () => {
  params.value.pagenum = 1
  getArticleData()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleData()
}

// 添加或者編輯 成功的emit 回調
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加, 最好渲染最後一頁
    const lastPage = Math.ceil((totalPage.value + 1) / params.value.pagesize) // {總條數+1/數據條數)
    // 更新成最大頁碼數, 再渲染
    params.value.pagenum = lastPage
    getArticleData()
  } else {
    // 如果是編輯,直接渲染當前頁即可
    getArticleData()
  }
}

/**
 * 目標: 使用v-model跟子組件下拉選擇框綁定, 得到選擇id值 (作為傳參)
 *
 * 1. 聲明選擇框ID的變量 cateId = ref(63255)
 * 2. <ChannelSelect v-model="cateId">  // Vue3 => v-model  :modelValue 和 @update:modelValue 的簡寫
 * 3. defineProps ({ modelValue }) 接收
 * 4. const emit = defineEmits(['update:modelValue'])
 * 5. <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
 * * */
</script>
<template>
  <pageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onPost">發布文章</el-button>
    </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類">
        <!-- Vue2 => v-model  :value 和 @input 的簡寫 -->
        <!-- Vue3 => v-model  :modelValue 和 @update:modelValue 的簡寫 -->

        <!-- <ChannelSelect v-model:modelValue="params.cateId"></ChannelSelect> -->

        <!-- Vue3 => v-model:cid :cid 和 @update 的簡寫 -->
        <ChannelSelect v-model:cid="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="發布狀態">
        <!-- 這裡後臺標記發布狀態, 就是通過中文標記的, 已發布 / 草稿 -->
        <el-select v-model="params.state">
          <el-option label="已發布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章標題" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分類" prop="cate_name"></el-table-column>
      <el-table-column label="發表時間" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="狀態" prop="state"></el-table-column>
      <el-table-column label="操作">
        <!-- 利用作用域插槽 row 可以獲取當前行的數據 => v-for 遍歷 item -->
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 4, 6, 8]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="totalPage"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: end"
    />
    <ArticleEdit ref="drawer" @success="onSuccess"></ArticleEdit>
  </pageContainer>
</template>

<style scoped lang="less"></style>
