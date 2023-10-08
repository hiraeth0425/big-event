<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <!-- <el-button type="primary">添加分類</el-button> -->
        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
