import { createAPI } from '@/utils/request'

// 标签列表
export const list = data => createAPI('/tags', 'get', data)

// 标签简单列表
export const simple = data => createAPI('/tags/simple', 'get', data)

// 标签详情
export const detail = data => createAPI(`/tags/${data.id}`, 'get', data)

// 标签添加
export const add = data => createAPI(`/tags`, 'post', data)

// 标签修改
export const update = data => createAPI(`/tags/${data.id}`, 'put', data)

// 标签删除
export const remove = data =>
  createAPI(`/tags/${data.id}`, 'delete', data)

// 标签状态
export const remove = data => createAPI(`/tags/${data.id}/state`, 'post', data)
