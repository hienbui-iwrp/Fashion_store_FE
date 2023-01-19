import { ReactNode } from 'react'

export interface ButtonProps {
  label: string
  iconInput?: ReactNode
  onclick?: () => void
}

export interface TableListProps<T> {
  data: T[]
  title: string
  columns: any
  editModal?: ReactNode
  selectUrl?: string
}
