import React from 'react'
import { Button, message, Space } from 'antd'
import { useMessageProps } from '@/utils'

const useMessage = (props: useMessageProps) => {
  const [messageApi, contextMessage] = message.useMessage()

  const openMessage = () => {
    messageApi.open({
      type: 'success',
      content: props.content ?? 'Cập nhật thành công',
    })
  }
  return { openMessage, contextMessage }
}

export default useMessage
