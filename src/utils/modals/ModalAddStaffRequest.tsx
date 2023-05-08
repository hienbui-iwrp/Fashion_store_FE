import React, { useEffect, useState } from 'react'
import {
  Col,
  Modal,
  Row,
  Space,
  Form,
  Input,
  DatePicker,
  InputNumber,
} from 'antd'
import { ModalAddEditStaffProps } from '../types/modalType'
import { AddButton, DropdownButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { BranchProps, formatBranchDataXML } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { Gender, Routes, StaffRole } from '@/constants'
import { useRouter } from 'next/router'
import { addStaffBFF, createAddRequest, getBranchBff } from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

export const ModalAddStaffRequest = (props: ModalAddEditStaffProps) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      await createAddRequest({
        ...values,
        branchId: localStorage.getItem('branchId'),
      })
        .then(async (res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          dispatch(setNotificationValue('Đã gửi yêu cầu thêm mới'))
        })
        .catch((error) => {
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
    <>
      <Modal
        title={props.extraData ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
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
            <AddButton
              key='add'
              label='Lưu'
              icon={<CheckOutlined />}
              onClick={onSave}
            />
          </Space>,
        ]}
      >
        <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='Họ tên'
                name='name'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên họ tên'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item
                label='Ngày sinh'
                name='birthdate'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <DatePicker
                  className={styles.adminInputShadow}
                  style={{ width: '100%' }}
                  format={'DD/MM/YYYY'}
                  onChange={(date) => {
                    console.log(
                      date?.year() + '-' + date?.month() + '-' + date?.date()
                    )
                  }}
                />
              </Form.Item>
              <Form.Item
                label='Quê quán'
                name='hometown'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên quê quán'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item
                label='Căn cước'
                name='citizenId'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên căn cước'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập email'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item
                label='Giới tính'
                name='gender'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <DropdownButton
                  label={
                    Gender.find(
                      (item: any) => item.value === props.extraData?.gender
                    )?.content ?? 'Giới tính'
                  }
                  items={Gender.map((item) => item.content)}
                  callback={(gender: any) => {
                    form.setFieldValue(
                      'gender',
                      Gender.find((item: any) => item.content === gender)?.value
                    )
                  }}
                />
              </Form.Item>
              <Form.Item
                label='Điện thoại'
                name='phone'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên điện thoại'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item
                label='Lương'
                name='salary'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <InputNumber
                  placeholder='Nhập lương'
                  className={styles.adminInputShadow}
                  style={{ width: '100%' }}
                  // defaultValue={props?.extraData?.salary ?? ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <b>Địa chỉ</b>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                  // defaultValue={props.extraData?.street}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                  // defaultValue={props.extraData?.ward}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='Huyện, quận'
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
                  // defaultValue={props.extraData?.district}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                  // defaultValue={props.extraData?.province}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
