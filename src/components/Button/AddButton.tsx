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
        paddingTop: props.large ? 15 : 5,
        paddingBottom: props.large ? 15 : 5,
        paddingLeft: props.large ? 15 : 10,
        paddingRight: props.large ? 15 : 10,
        fontSize: props.large ? 16 : 14,
        borderRadius: props.borderRadius ?? 20,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      icon={props?.iconInput}
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
      {props.label ?? ''}
    </Button>
  )
}
