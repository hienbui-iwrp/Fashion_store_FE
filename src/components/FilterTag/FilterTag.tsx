import { useState } from 'react'
import { Button, Tag } from 'antd'
import { Colors } from '@/constants'
import { ButtonProps } from '@/utils/types/componentType'

export default function FilterTag(props: ButtonProps) {
  return (
    <Tag
      color={Colors.adminGreen300}
      closable={true}
      onClose={props.onClick}
      style={{
        color: Colors.adminGreen900,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        margin: '3px',
        ...props.style,
      }}
    >
      {props?.label}
    </Tag>
  )
}
