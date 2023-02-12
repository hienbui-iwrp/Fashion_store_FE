export interface useModalComfirmProps {
  title?: string
  content?: string
  onOk?: () => void
  onCancel?: () => void
}

export interface useNotificationProps {
  title?: string
  content?: string
}

export interface useMessageProps {
  content?: string
}
