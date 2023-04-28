import React from 'react'
import { Modal, Space, Form, Input } from 'antd'
import { ModalSampleProps } from '../types/modalType'
import { AddButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'

import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'
import { changePasswordAdminBFF } from '@/api'

const ModalChangePassword = (props: ModalSampleProps) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onSave = async () => {
    try {
      const values = await form.validateFields()

      //   call api
      await changePasswordAdminBFF({
        username: localStorage.getItem('userId'),
        oldPass: values.oldPassword,
        newPass: values.password,
      })
        .then((res) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          dispatch(setNotificationValue('Cập nhật mật khẩu thành công'))
        })
        .catch((err) => {
          console.log(err)
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
      props.callback && props.callback({})
      props.cancel && props.cancel()

      console.log('Success', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <Modal
      title='Đổi mật khẩu'
      open={props.open}
      onCancel={props.cancel}
      footer={[
        <Space key='btn'>
          <RemoveButton
            label='Hủy'
            key='cancel'
            icon={<CloseOutlined />}
            onClick={props.cancel}
          />
          ,
          <AddButton
            key='add'
            label='Lưu'
            icon={<CheckOutlined />}
            onClick={onSave}
          />
        </Space>,
      ]}
      style={{ maxWidth: 300 }}
      width={'90%'}
      centered
    >
      <Form name='basic' layout='vertical' form={form}>
        <Form.Item
          className='mb-2'
          label='Mật khẩu cũ'
          name='oldPassword'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            ({}) => ({
              validator(_, value) {
                if (!value || value.length > 5) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Mật khẩu dài tối thiểu 6 ký tự')
                )
              },
            }),
          ]}
        >
          <Input.Password className={styles.adminInputShadow} />
        </Form.Item>

        <Form.Item
          className='mb-2'
          label='Mật khẩu'
          name='password'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            ({}) => ({
              validator(_, value) {
                if (!value || value.length > 5) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Mật khẩu dài tối thiểu 6 ký tự')
                )
              },
            }),
          ]}
        >
          <Input.Password className={styles.adminInputShadow} />
        </Form.Item>

        <Form.Item
          className='mb-4'
          label='Nhập lại mật khẩu'
          name='confirmPassword'
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Nhập lại mật khẩu không đúng!')
                )
              },
            }),
          ]}
        >
          <Input.Password className={styles.adminInputShadow} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalChangePassword
