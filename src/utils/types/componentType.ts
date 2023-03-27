import { ReactNode } from 'react'

export interface ComponentProps {
  style?: object
  className?: string
  callback?: (item: any) => void
  disabled?: boolean
}

export interface ButtonProps extends ComponentProps {
  label?: string
  icon?: ReactNode
  onClick?: (e?: any) => void
  borderRadius?: number
  large?: boolean
}

export interface TableListProps<T> extends ComponentProps {
  data: T[]
  title?: string
  header?: ReactNode
  columns: any
  editModal?: ReactNode
  selectUrl?: string
  scroll?: { x?: string; y?: string }
  loading?: boolean
  pageSize?: number
  ellipsis?: boolean
  pagination?: boolean
  onSelectRow?: () => void
  rowSelection?: object
  rowKey?: string[]
  maxWidth?: string | number
}

export interface LineChartProps extends ComponentProps {
  revenue?: boolean
  profit?: boolean
  showTotal?: boolean
  data?: { profit?: number; revenue?: number; date: Date }[]
}

export interface DropdownButtonProps extends ComponentProps {
  label?: string
  items?: string[]
}

export interface InputSearchProps extends ComponentProps {
  onEnter?: (item?: any) => void
  width?: string | number
  placeholder?: string
  onClear?: () => void
}
