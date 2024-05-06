import axios from '@/utils/request.js'

export interface User {
  id: number
  group_id: number
  inv_code_id: number
  username: string
  password: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface getUser {
  current_page: number
  data: User[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: string
  to: number
  total: number
}

export interface addUser {
  username: string
  password: string
  role: 'user' | 'admin'
  group_id?: number
}

export const addUser = (data: addUser) => axios.post('/admin/user', data)

export const getUser = (data: { page: number; size: number }) =>
  axios.get<getUser>(`/admin/user?page=${data.page}&size=${data.size}`)

export const updateUser = (user: User) => axios.patch(`/admin/user/${user.id}`, user)

export const deleteUser = (user: User) => axios.delete(`/admin/user/${user.id}`)
