import request from '@/utils/request.js'

// 獲取文章分類
export const getArticleClass = () => request.get('/my/cate/list')

// 增加文章分類
export const addArtcleClass = (data) => request.post('/my/cate/add', data)

// 編輯文章分類
export const changeArticleClass = (data) => request.put('/my/cate/info', data)
