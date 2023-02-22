import { useState } from 'react'
import { Input } from 'antd'
import { Colors } from '@/constants'
import { InputSearchProps } from '@/utils/types/componentType'
import { SearchOutlined } from '@ant-design/icons'

export default function InputSearch(props: InputSearchProps) {
  return (
    <Input
      style={{
        width: props.width ?? 220,
        height: 34,
        color: Colors.adminGreen900,
        borderRadius: 16,
        paddingLeft: 10,
        backgroundColor: Colors.white,
        ...props.style,
      }}
      placeholder={props.placeholder ?? 'Tìm kiếm theo mã, tên'}
      onPressEnter={(item: any) => {
        if (item.target.value != '')
          props?.onEnter && props?.onEnter(item.target.value)
      }}
      allowClear
      onChange={(item) => {
        if (item.target.value == '') props.onClear && props.onClear()
      }}
      bordered={false}
      suffix={
        <SearchOutlined color={Colors.adminGreen900} style={{ fontSize: 16 }} />
      }
    />
  )
}
