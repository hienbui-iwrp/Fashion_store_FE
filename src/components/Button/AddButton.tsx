import { useState } from 'react'
import { Button } from 'antd'
import { Colors } from '@/constants'
import { ButtonProps } from '@/utils/types/componentType'

export default function AddButton(props: ButtonProps) {
  const [isHover, setIsHover] = useState(false)
  return (
    <Button
      style={{
        backgroundColor: isHover ? Colors.adminGreen600 : Colors.adminGreen900,
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
      }}
      icon={props?.icon}
      size='middle'
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      onClick={props?.onClick}
    >
      {props.label ?? ''}
    </Button>
  )
}
