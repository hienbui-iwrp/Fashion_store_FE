import { notification } from 'antd'
import { useNotificationProps } from '@/utils'

const useNotification = (props: useNotificationProps) => {
  const [api, contextNotification] = notification.useNotification()

  const openNotification = () => {
    api[props.type ?? 'success']({
      message: props.title ?? 'Thành công',
      description: props.content ?? 'Cập nhật thành công',
    })
  }

  return {
    openNotification,
    contextNotification,
  }
}

export default useNotification
