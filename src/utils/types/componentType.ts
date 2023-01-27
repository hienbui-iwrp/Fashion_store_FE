import { ReactNode } from 'react'

export interface ButtonProps {
  label?: string
  iconInput?: ReactNode
  onClick?: (e?: any) => void
  borderRadius?: number
}

export interface TableListProps<T> {
  data: T[]
  title: string
  columns: any
  editModal?: ReactNode
  selectUrl?: string
  scroll?: { x?: string; y?: string }
  loading?: boolean
}
