import { ReactNode, useState } from 'react'
import { Button } from 'antd'
import { Colors } from '@/constants'

export default function ButtonHeader({
  name,
  icon,
}: {
  name: string
  icon?: ReactNode
}) {
  const [hover, setHover] = useState(false)
  return (
    <Button
      type="primary"
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      style={{
        backgroundColor: hover ? Colors.adminGreen500 : Colors.adminGreen700,
      }}
      icon={icon || null}
    >
      {name}
    </Button>
  )
}
