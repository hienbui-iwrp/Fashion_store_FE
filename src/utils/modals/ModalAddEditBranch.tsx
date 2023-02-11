import React, { useEffect, useState } from 'react'
import { Col, Modal, Row, Space, Image, Form, Input, TimePicker } from 'antd'
import { ModalAddEditBranchProps } from '../types/modalType'
import { AddButton, RemoveButton } from '@/components'
import {
  CheckOutlined,
  CloseOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { formatTime } from '..'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import axios from 'axios'
import { apiBranchService } from '../axios'

dayjs.extend(customParseFormat)

const ModalAddEditBranch = (props: ModalAddEditBranchProps) => {
  const [form] = Form.useForm()

  return (
    <>
      <Modal
        title={props.extraData ? 'Chỉnh sửa chi nhánh' : 'Thêm chi nhánh mới'}
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
        style={{ maxWidth: '90%' }}
        width={700}
        footer={[
          <Space key='btn'>
            <RemoveButton
              label='Hủy'
              key='cancel'
              iconInput={<CloseOutlined />}
              onClick={props.cancel}
            />
            ,
            <AddButton
              key='add'
              label='Lưu'
              iconInput={<CheckOutlined />}
              onClick={async () => {
                try {
                  const values = await form.validateFields()
                  const a = await apiBranchService.post('/branch-service/')
                  console.log('Success:', values)
                } catch (errorInfo) {
                  console.log('Failed:', errorInfo)
                }
              }}
            />
          </Space>,
        ]}
      >
        <Row>
          <Col xs={24} sm={12}>
            <Space direction='vertical' align='center'>
              <Image
                alt='img'
                preview={true}
                src={
                  props.extraData?.image ??
                  'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                }
                width={'90%'}
              />
              <AddButton
                key='add'
                label='Chọn ảnh'
                iconInput={<FileImageOutlined />}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12}>
            <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
              <Form.Item
                label='Tên chi nhánh'
                name='name'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên chi nhánh'
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
              <b>Giờ hoạt động</b>
              <Space size='large'>
                <Form.Item
                  label='Giờ mở cửa'
                  name='openTime'
                  rules={[
                    {
                      required: props.extraData ? false : true,
                      message: 'Vui lòng nhập',
                    },
                  ]}
                >
                  <TimePicker
                    defaultValue={
                      props.extraData?.openTime &&
                      dayjs(formatTime(props.extraData?.openTime), 'HH:mm ')
                    }
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
                    className={styles.adminInputShadow}
                  />
                </Form.Item>
                <Form.Item
                  label='Giờ đóng cửa'
                  name='name'
                  rules={[
                    {
                      required: props.extraData ? false : true,
                      message: 'Vui lòng nhập',
                    },
                  ]}
                >
                  <TimePicker
                    defaultValue={
                      props.extraData?.closeTime &&
                      dayjs(formatTime(props.extraData?.closeTime), 'HH:mm ')
                    }
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
                    className={styles.adminInputShadow}
                  />
                </Form.Item>
              </Space>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ModalAddEditBranch
