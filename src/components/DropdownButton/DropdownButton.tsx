import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Colors } from '@/constants'
import { DropdownButtonProps } from '@/utils/types/componentType'
import styles from '@/styles/Admin.module.css'

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
    <span>
      <Dropdown
        menu={{ items: items ?? [] }}
        placement='bottomLeft'
        className={styles.adminInputShadow}
        {...props}
      >
        <Button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: isHover ? Colors.adminGreen500 : Colors.black,
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
    </span>
  )
}

export default DropdownButton
