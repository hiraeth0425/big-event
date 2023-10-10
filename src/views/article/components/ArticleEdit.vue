<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const open = (row) => {
  console.log(row)
  drawer.value = true
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屜 -->
  <el-drawer v-model="drawer" title="標題" direction="rtl" size="50%">
    <span>Hi, there!</span>
  </el-drawer>
</template>
