<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'

const articleList = [
  {
    Id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    Id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: '草稿',
    cate_name: '体育'
  }
]
// 定義請求參數對象

// const cateId = ref(63255)
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

// 編輯邏輯
const onEditArticle = (row) => {
  console.log(row)
}
// 刪除邏輯
const onDelArticle = (row) => {
  console.log(row)
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
      <el-button type="primary">發布文章</el-button>
    </template>
    <!-- 表單區域 -->
    <el-form inline>
      <el-form-item label="文章分類">
        <!-- Vue2 => v-model  :value 和 @input 的簡寫 -->
        <!-- Vue3 => v-model  :modelValue 和 @update:modelValue 的簡寫 -->

        <!-- <ChannelSelect v-model:modelValue="params.cateId"></ChannelSelect> -->

        <!-- Vue3 => v-mode:cid :cid 和 @update 的簡寫 -->
        <ChannelSelect v-model:cid="params.cateId"></ChannelSelect>
      </el-form-item>
      <el-form-item label="發布狀態">
        <!-- 這裡後臺標記發布狀態, 就是通過中文標記的, 已發布 / 草稿 -->
        <el-select v-model="params.state">
          <el-option label="已發布" value="已發布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格區域 -->
    <el-table :data="articleList">
      <el-table-column label="文章標題" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分類" prop="cate_name"></el-table-column>
      <el-table-column label="發表時間" prop="pub_date"></el-table-column>
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
  </pageContainer>
</template>

<style scoped lang="less"></style>
