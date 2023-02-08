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
        fontWeight: props.large ? 'bold' : '500',
        padding: props.large ? 20 : 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: props.large ? 16 : 14,
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
      {...props}
    >
      {props.label ?? 'Xóa'}
    </Button>
  )
}
