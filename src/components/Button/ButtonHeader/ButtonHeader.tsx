import { ReactNode } from 'react'
import { Button } from 'antd'

export default function ButtonHeader({
  name,
  icon,
}: {
  name: string
  icon?: ReactNode
}) {
  return (
    <Button
      className='bg-[#D9D9D9] hover:!bg-[#D9D9D9]'
      type='text'
      icon={icon || null}
    >
      {name}
    </Button>
  )
}
