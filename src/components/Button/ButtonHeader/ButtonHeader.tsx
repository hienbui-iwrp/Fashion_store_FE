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
        backgroundColor: hover ? Colors.clientEmerald400 : Colors.transparent,
        // backgroundColor: Colors.transparent,
        borderRadius: 25,
        width: 42,
        height: 42,
        color: hover ? Colors.white : Colors.clientGray300,
        // color: Colors.white,
        boxShadow: '0 0 0',
      }}
      icon={icon || null}
    >
      {name ? <b className='pl-2  '>{name}</b> : ''}
    </Button>
  )
}
