import { notification } from 'antd'
import { useNotificationProps } from '@/utils'

const useNotification = (props: useNotificationProps) => {
  const [api, contextNotification] = notification.useNotification()

  // const openNotification = () => {
  //   api[props.type ?? 'success']({
  //     message: props.type == 'error' ? 'Thất bại' : 'Thành công',
  //     description: props.content ?? 'Cập nhật thành công',
  //   })
  // }

  const openNotification = () => {
    api[props.type ?? 'success']({
      // message: props.type == 'error' ? 'Thất bại' : 'Thành công',
      message: props.content ?? 'Cập nhật thành công',
    })
  }

  return {
    openNotification,
    contextNotification,
  }
}

export default useNotification
