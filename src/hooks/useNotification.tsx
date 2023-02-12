import { notification } from 'antd'
import { useNotificationProps } from '@/utils'

const useNotification = (props: useNotificationProps) => {
  const [api, contextNotification] = notification.useNotification()

  const openNotification = () => {
    api['success']({
      message: props.title,
      description: props.content,
    })
  }

  return {
    openNotification,
    contextNotification,
  }
}

export default useNotification
