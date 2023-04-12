import { ReactNode, useState } from 'react'
import { Button } from 'antd'
import { Colors } from '@/constants'

export default function ButtonHeader({
  name,
  icon,
}: {
  name?: string
  icon?: ReactNode
}) {
  const [hover, setHover] = useState(false)
  return (
    <Button
      type='primary'
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      style={{
        backgroundColor: hover ? Colors.clientBlack300 : Colors.transparent,
        borderRadius: 25,
        width: 42,
        height: 42,
        // color: Colors.clientBlack700,
        color: Colors.white,
        boxShadow: '0 0 0',
      }}
      icon={icon || null}
    >
      {name ?? ''}
    </Button>
  )
}
