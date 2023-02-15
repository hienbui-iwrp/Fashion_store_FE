import { ReactNode, useState } from 'react'
import { Button, Typography } from 'antd'
import { Colors } from '@/constants'

export default function ButtonClientPrimary({
  htmlType,
  name,
  iconInput,
  onClick,
}: {
  htmlType?: any
  name?: string
  iconInput?: ReactNode
  onClick?: () => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <Button
      htmlType={htmlType}
      onClick={onClick}
      className={`flex justify-center px-3 items-center  text-white font-bold  rounded-xl  !w-auto hover:!text-white`}
      type='text'
      icon={iconInput || null}
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      style={{
        backgroundColor: hover ? Colors.adminGreen300 : Colors.adminGreen700,
      }}
    >
      {name ? (
        <Typography className='px-6 text-white'>{name}</Typography>
      ) : null}
    </Button>
  )
}
