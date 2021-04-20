import request from '@/utils/request'

export function getDishType(params) {
  return request({
    url: 'http://127.0.0.1:3000/menu/dish_type/list',
    method: 'get',
    params
  })
}
export function delDishType(id) {
  return request({
    url: `http://127.0.0.1:3000/menu/dish_type/delete/${id}`,
    method: 'delete'
  })
}
export function updateDishType(id, data) {
  return request({
    url: `http://127.0.0.1:3000/menu/dish_type/update/${id}`,
    method: 'put',
    data
  })
}
export function addDishType(data) {
  return request({
    url: `http://127.0.0.1:3000/menu/dish_type/add`,
    method: 'post',
    data
  })
}
export function getDishList(data) {
  return request({
    url: 'http://127.0.0.1:3000/menu/dish/list',
    method: 'post',
    data
  })
}

export function addDish(data) {
  return request({
    url: 'http://127.0.0.1:3000/menu/dish/add',
    method: 'post',
    data
  })
}

export function updateDish(id, data) {
  return request({
    url: `http://127.0.0.1:3000/menu/dish/update/${id}`,
    method: 'put',
    data
  })
}

export function delDish(id) {
  return request({
    url: `http://127.0.0.1:3000/menu/dish/delete/${id}`,
    method: 'delete'
  })
}
export function getOrderList() {
  return request({
    url: 'http://127.0.0.1:3000/menu/order_list',
    method: 'get'
  })
}
export function getOrder(id) {
  return request({
    url: `http://127.0.0.1:3000/menu/order/${id}`,
    method: 'get'
  })
}
