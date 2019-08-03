import { createAPI } from '@/utils/request'

export const list = data => createAPI('/companys', 'get', data)
export const add = data => createAPI('/companys', 'post', data)
export const update = data => createAPI(`/companys/${data.id}`, 'put', data)
export const remove = data => createAPI(`/companys/${data.id}`, 'delete', data)
export const detail = data => createAPI(`/companys/${data.id}`, 'get', data)
export const disabled = data =>
  createAPI(`/companys/${data.id}/state`, 'post', data)
