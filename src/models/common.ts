import { ReactNode } from 'react'

export interface PaginationParams {
  limit: number
  page: number
  totals: number
  totalRows: number
  totalPages: number
}

export interface ListResponse<T> {
  data: T[]
  pagination: PaginationParams
}

export interface ListParams {
  _page?: number
  _limit?: number
  _sort?: string
  _order?: 'asc' | 'desc'

  [key: string]: any
}

export interface Params {
  page: number
  limit: number
  search?: string
}

export interface LayoutProps {
  children: ReactNode
}

export interface Token {
  token: string
  expired: boolean
}
