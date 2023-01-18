import { ReactNode } from 'react'

export interface ButtonProps {
  label: string
  iconInput?: ReactNode
  onclick?: () => void
}

export interface TableProps {
  name?: string
  label: string[]
  data: string[][]
}
