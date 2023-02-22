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
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { useRouter } from 'next/router'
import { Routes } from '@/constants'
import { useDispatch } from 'react-redux'
import {
  setNotificationType,
  setNotificationValue,
} from '@/redux/slices/notificationSlice'
import { addBranch, updateBranch } from '@/api'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const ModalAddEditBranch = (props: ModalAddEditBranchProps) => {
  const [form] = Form.useForm()
  const routes = useRouter()
  const dispatch = useDispatch()

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      if (!props.extraData) {
        addBranch(values)
          .then((res: any) => {
            if (res.data.StatusCode != 200) throw new Error('FAIL')

            dispatch(setNotificationValue('Đã thêm chi nhánh mới'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
      } else {
        updateBranch(props.extraData.id, values)
          .then((res: any) => {
            if (res.data.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('Đã cập nhật thông tin chi nhánh'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
      }

      props.callback && props.callback({})
      props.cancel && props.cancel()
      routes.push(Routes.admin.branch)

      console.log('Success', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

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
              onClick={onSave}
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
                    onOk={(item) => {}}
                    className={styles.adminInputShadow}
                  />
                </Form.Item>
                <Form.Item
                  label='Giờ đóng cửa'
                  name='closeTime'
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
                    onOk={(item) => {}}
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
