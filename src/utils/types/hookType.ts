export interface useModalComfirmProps {
  title?: string
  content?: string
  onOk?: () => void
  onCancel?: () => void
}

export interface useNotificationProps {
  content?: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

export interface useMessageProps {
  content?: string
}
