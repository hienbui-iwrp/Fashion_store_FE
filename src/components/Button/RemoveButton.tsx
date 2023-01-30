import { useState } from 'react'
import { Button } from 'antd'
import { Colors } from '@/constants'
import { ButtonProps } from '@/utils/types/componentType'
import { DeleteFilled } from '@ant-design/icons'

export default function RemoveButton(props: ButtonProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <Button
      style={{
        backgroundColor: isHover ? Colors.adminRed500 : Colors.adminRed900,
        color: Colors.white,
        border: 0,
        fontWeight: 'bold',
        borderRadius: props.borderRadius ?? 20,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
      }}
      icon={props?.iconInput ?? <DeleteFilled />}
      size='middle'
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      onClick={props?.onClick}
    >
      {props.label ?? 'Xóa'}
    </Button>
  )
}
