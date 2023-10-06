import { defineStore } from 'pinia'
import { ref } from 'vue'

// 數字計數器模塊
export const useCountStore = defineStore('big-count', () => {
  const count = ref(100)
  const addCount = (n) => {
    count.value += n
  }

  return {
    count,
    addCount
  }
})
