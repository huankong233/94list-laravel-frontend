import axios from '@/utils/request.js'

export interface config {
  version: string
  front_end_version: string
  sleep: number
  max_once: number
  password: string
  announce: string
  user_agent: string
  need_inv_code: boolean
  whitelist_mode: boolean
  show_copyright: boolean
  custom_copyright: string
  main_server: string
  code: string
  parse_mode: number
  max_filesize: number
  min_single_file: number
  token_mode: boolean
  button_link: string
  limit_cn: boolean
  limit_prov: boolean
  debug: boolean
  name: string
}

export const getConfig = () => axios.get<config>('/admin/config/main')

export const updateConfig = (data: config) => axios.patch<null>('/admin/config/main', data)

export type testAuth =
  | {
      code: string
      expired_at: string
    }
  | { ip: string }

export const testAuth = (data: config) => axios.post<testAuth>('/admin/config/main/testAuth', data)
