import request from '@/utils/request.js'

// 分類: 獲取文章分類
export const getArticleClass = () => request.get('/my/cate/list')

// 分類: 增加文章分類
export const addArtcleClass = (data) => request.post('/my/cate/add', data)

// 分類: 編輯文章分類
export const changeArticleClass = (data) => request.put('/my/cate/info', data)

// 分類: 刪除文章分類
export const derArticleClass = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

// 文章: 獲取文章列表
export const getArticleService = (params) =>
  request.get('/my/article/list', { params })

// 文章: 發布文章列表    注意 data 需要是一個 formData 格式的對象
export const getPublishService = (data) => request.post('/my/article/add', data)

// 文章: 獲取文章詳情
export const getPublicDetailService = (id) =>
  request.get('/my/article/info', { params: { id } })

// 文章: 更新文章詳情   注意 data 需要是一個 formData 格式的對象
export const editArticleDetailService = (data) =>
  request.put('/my/article/info', data)
