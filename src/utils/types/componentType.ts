import { ReactNode } from 'react'

export interface ComponentProps {
  styles?: object
  className?: string
}

export interface ButtonProps extends ComponentProps {
  label?: string
  iconInput?: ReactNode
  onClick?: (e?: any) => void
  borderRadius?: number
}

export interface TableListProps<T> extends ComponentProps {
  data: T[]
  title?: string
  columns: any
  editModal?: ReactNode
  selectUrl?: string
  scroll?: { x?: string; y?: string }
  loading?: boolean
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
