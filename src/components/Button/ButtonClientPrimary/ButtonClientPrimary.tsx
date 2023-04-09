import { ReactNode, useState } from 'react'
import { Button, Typography } from 'antd'
import { Colors } from '@/constants'

export default function ButtonClientPrimary({
  htmlType,
  type,
  disabled,
  name,
  icon,
  onClick,
}: {
  htmlType?: any
  disabled?: any
  type?: string
  name?: string
  icon?: ReactNode
  onClick?: (e?: any) => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <Button
      disabled={disabled}
      htmlType={htmlType}
      onClick={onClick}
      className={`flex justify-center px-3 items-center ${
        disabled ? '' : 'text-white hover:!text-white'
      } font-bold rounded-xl !w-auto`}
      icon={icon || null}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      style={{
        backgroundColor: disabled
          ? undefined
          : hover
          ? Colors.clientGreen400
          : Colors.clientGreen700,
      }}
    >
      {name ? (
        <Typography
          className={`px-6 ${disabled ? 'text-gray-300' : 'text-white'}`}
        >
          {name}
        </Typography>
      ) : null}
    </Button>
  )
}
