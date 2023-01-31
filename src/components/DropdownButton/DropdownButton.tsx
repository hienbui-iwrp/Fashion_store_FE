import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Colors } from '@/constants'
import { DropdownButtonProps } from '@/utils/types/componentType'

const DropdownButton = (props: DropdownButtonProps) => {
  const [isHover, setIsHover] = useState(false)

  const items: MenuProps['items'] =
    props?.items &&
    props?.items.map((item, index) => {
      return {
        key: index,
        label: <span onClick={item.onClick}>{item.content}</span>,
      }
    })

  return (
    <Dropdown menu={{ items: items ?? [] }} placement='bottomLeft'>
      <Button
        style={{
          display: 'flex',
          alignItems: 'center',
          color: isHover ? Colors.adminGreen500 : Colors.black,
          border: 0,
          boxShadow: '1px 4px 6px 1px #ccc',
          borderRadius: 12,
        }}
        onMouseEnter={() => {
          setIsHover(true)
        }}
        onMouseLeave={() => {
          setIsHover(false)
        }}
      >
        {props?.label}
        <CaretDownOutlined
          style={{
            color: isHover ? Colors.adminGreen500 : Colors.adminGreen900,
            marginLeft: 10,
            marginRight: -5,
          }}
        />
      </Button>
    </Dropdown>
  )
}

export default DropdownButton
