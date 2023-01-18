import { ReactNode, useState } from 'react'
import { Button } from 'antd'
import { Colors } from '@/constants'

export default function AddButton(props: {
  label: string
  iconInput?: ReactNode
}) {
  const [isHover, setIsHover] = useState(false)

  return (
    <Button
      style={{
        backgroundColor: isHover ? Colors.adminGreen600 : Colors.adminGreen900,
        color: Colors.white,
        border: 0,
        fontWeight: 'bold',
        borderRadius: 20,
        paddingLeft: 24,
        paddingRight: 24,
      }}
      icon={props?.iconInput}
      size='middle'
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      {props.label}
    </Button>
  )
}
