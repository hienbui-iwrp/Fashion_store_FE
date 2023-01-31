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

export interface LineChartProps {
  haveRevenue?: boolean
  haveProfit?: boolean
  showTotal?: boolean
  data?: { profit?: number; revenue?: number; date: Date }[]
}

export interface DropdownButtonProps {
  label?: string
  items?: { content?: string; onClick?: () => void }[]
}
