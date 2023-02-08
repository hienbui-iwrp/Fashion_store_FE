import { ReactNode } from 'react'

export interface ComponentProps {
  styles?: object
  className?: string
  callBack?: (item: any) => void
}

export interface ButtonProps extends ComponentProps {
  label?: string
  iconInput?: ReactNode
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
}

export interface LineChartProps extends ComponentProps {
  haveRevenue?: boolean
  haveProfit?: boolean
  showTotal?: boolean
  data?: { profit?: number; revenue?: number; date: Date }[]
}

export interface DropdownButtonProps extends ComponentProps {
  label?: string
  items?: { content?: string; onClick?: () => void }[]
}

export interface InputSearchProps extends ComponentProps {
  onEnter?: () => void
  width?: string | number
  placeholder?: string
}
