<script setup>
import { ref } from 'vue'
import { getArticleClass } from '@/api/article.js'

defineProps({
  cid: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:cid'])

const articleList = ref([])
const getArticleList = async () => {
  const res = await getArticleClass()
  articleList.value = res.data.data
  //   console.log(articleList.value)
}
getArticleList()
</script>
<template>
  <!-- label 展示給用戶看的, value 收集起來提交給後台的 -->
  <!-- Vue3 => v-model  :modelValue 和 @update:modelValue 的簡寫 -->
  <el-select
    :style="{ width }"
    :modelValue="cid"
    @update:modelValue="emit('update:cid', $event)"
  >
    <el-option
      v-for="channel in articleList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
