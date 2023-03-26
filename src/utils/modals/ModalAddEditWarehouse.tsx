import React, { useEffect, useState } from 'react'
import {
  Col,
  Modal,
  Row,
  Space,
  Image,
  Form,
  Input,
  TimePicker,
  InputNumber,
} from 'antd'
import { AddButton, RemoveButton } from '@/components'
import {
  CheckOutlined,
  CloseOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { formatTime, ModalAddEditWarehouseProps } from '..'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import axios from 'axios'

dayjs.extend(customParseFormat)

const ModalAddEditWarehouse = (props: ModalAddEditWarehouseProps) => {
  const [form] = Form.useForm()

  return (
    <>
      <Modal
        title={props.extraData ? 'Chỉnh sửa kho' : 'Thêm kho mới'}
        style={{ maxWidth: 400 }}
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
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
              onClick={async () => {
                try {
                  const values = await form.validateFields()
                  console.log('Success:', values)
                } catch (errorInfo) {
                  console.log('Failed:', errorInfo)
                }
              }}
            />
          </Space>,
        ]}
      >
        <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
          <Form.Item
            name='name'
            label='Tên kho'
            rules={[
              {
                required: props.extraData ? false : true,
                message: 'Vui lòng nhập',
              },
            ]}
          >
            <Input
              placeholder='Nhập tên kho'
              className={styles.adminInputShadow}
              defaultValue={props.extraData?.name}
            />
          </Form.Item>
          <b>Địa chỉ</b>
          <Space size='large'>
            <Form.Item
              label='Đường'
              name='street'
              rules={[
                {
                  required: props.extraData ? false : true,
                  message: 'Vui lòng nhập',
                },
              ]}
            >
              <Input
                placeholder='Nhập tên đường'
                className={styles.adminInputShadow}
                defaultValue={props.extraData?.street}
              />
            </Form.Item>
            <Form.Item
              label='Xã, phường'
              name='ward'
              rules={[
                {
                  required: props.extraData ? false : true,
                  message: 'Vui lòng nhập',
                },
              ]}
            >
              <Input
                placeholder='Nhập xã, phường'
                className={styles.adminInputShadow}
                defaultValue={props.extraData?.ward}
              />
            </Form.Item>
          </Space>
          <Space size='large'>
            <Form.Item
              label='Huyện, thành phố'
              name='district'
              rules={[
                {
                  required: props.extraData ? false : true,
                  message: 'Vui lòng nhập',
                },
              ]}
            >
              <Input
                placeholder='Nhập huyện, thành phố'
                className={styles.adminInputShadow}
                defaultValue={props.extraData?.district}
              />
            </Form.Item>
            <Form.Item
              label='Tỉnh, thành phố'
              name='province'
              rules={[
                {
                  required: props.extraData ? false : true,
                  message: 'Vui lòng nhập',
                },
              ]}
            >
              <Input
                placeholder='Nhập tỉnh, thành phố'
                className={styles.adminInputShadow}
                defaultValue={props.extraData?.province}
              />
            </Form.Item>
          </Space>

          <Form.Item
            label='Sức chứa'
            name='capacity'
            rules={[
              {
                required: props.extraData ? false : true,
                message: 'Vui lòng nhập',
              },
            ]}
          >
            <InputNumber
              placeholder='Nhập sức chứa`'
              className={styles.adminInputShadow}
              defaultValue={props.extraData?.capacity}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddEditWarehouse
