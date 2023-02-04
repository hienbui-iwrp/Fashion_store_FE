import React from 'react'
import { Modal } from 'antd'
import { Colors } from '@/constants'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useModalComfirmProps } from '@/utils/types/hookType'

const useModalConfirm = (props: useModalComfirmProps) => {
  const [modalComfirm, contextModalComfirm] = Modal.useModal()

  const showModelConfirm = () => {
    modalComfirm.confirm({
      title: props.title ?? 'Xác nhận xóa',
      content: props.content ?? 'Bạn có chắc muốn xóa',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      centered: true,
      onOk: props?.onOk,
      onCancel: props?.onCancel,
      okButtonProps: { style: { backgroundColor: Colors.adminRed500 } },
      cancelButtonProps: {
        style: {
          borderColor: Colors.adminGreen500,
          color: Colors.adminGreen500,
        },
      },
      icon: <ExclamationCircleOutlined />,
    })
  }

  return { showModelConfirm, contextModalComfirm }
}

export default useModalConfirm
