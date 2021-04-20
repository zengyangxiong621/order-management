import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://127.0.0.1:3000/admin/mananger/list',
    method: 'get',
    params
  })
}
export function delManager(id) {
  return request({
    url: `http://127.0.0.1:3000/admin/manager/delete/${id}`,
    method: 'delete'
  })
}
export function updateManager(id, data) {
  return request({
    url: `http://127.0.0.1:3000/admin/manager/update/${id}`,
    method: 'put',
    data
  })
}
export function registerManager(data) {
  return request({
    url: `http://127.0.0.1:3000/admin/manager/register`,
    method: 'post',
    data
  })
}


