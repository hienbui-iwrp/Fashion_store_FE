import { useState } from 'react'
import { Input } from 'antd'
import { Colors } from '@/constants'
import { InputSearchProps } from '@/utils/types/componentType'
import { SearchOutlined } from '@ant-design/icons'

export default function InputSearch(props: InputSearchProps) {
  const [isHover, setIsHover] = useState(false)

  return (
    <Input
      style={{
        width: props.width ?? 200,
        color: Colors.adminGreen900,
        borderRadius: 16,
        paddingLeft: 10,
        backgroundColor: Colors.white,
      }}
      placeholder='input search text'
      onPressEnter={props?.onEnter}
      allowClear
      bordered={false}
      suffix={
        <SearchOutlined color={Colors.adminGreen900} style={{ fontSize: 16 }} />
      }
    />
  )
}
