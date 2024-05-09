import axios from '@/utils/request.js'

export interface Record {
  id: number
  ip: string
  fs_id: string
  filename: string
  size: number
  url: string
  ua: string
  user_id: number
  account_id: number
  created_at: string
  updated_at: string
  deleted_at: string
}

export interface getRecord {
  current_page: number
  data: Record[]
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

export const getRecord = (data: { page: number; size: number }) =>
  axios.get<getRecord>(`/admin/record?page=${data.page}&size=${data.size}`)

export const deleteRecord = (record: Record) => axios.delete(`/admin/record/${record.id}`)

export const deleteRecords = (record_ids: number[]) =>
  axios.delete('/admin/record', { data: { record_ids } })
