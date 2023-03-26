import React, { useState } from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Colors } from '@/constants'
import { DropdownButtonProps } from '@/utils/types/componentType'
import styles from '@/styles/Admin.module.css'
import { MenuInfo } from 'rc-menu/lib/interface'

const DropdownButton = (props: DropdownButtonProps) => {
  const [isHover, setIsHover] = useState(false)
  const [label, setLabel] = useState(props?.label)

  const items: MenuProps['items'] =
    props?.items &&
    props?.items.map((item, index) => {
      return {
        key: item,
        label: <button>{item}</button>,
      }
    })

  const handleMenuClick: MenuProps['onClick'] = (e: MenuInfo) => {
    props.callback && props.callback(e.key)
    setLabel(e.key)
  }

  return (
    <span>
      <Dropdown
        menu={{ items: items ?? [], onClick: handleMenuClick }}
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
          {label}
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
