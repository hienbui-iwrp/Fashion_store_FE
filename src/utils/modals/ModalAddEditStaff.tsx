import React, { useState } from 'react'
import {
  Col,
  Modal,
  Row,
  Space,
  Form,
  Input,
  TimePicker,
  DatePicker,
  InputNumber,
} from 'antd'
import { ModalAddEditStaffProps } from '../types/modalType'
import { AddButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import { formatDate } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const ModalAddEditStaff = (props: ModalAddEditStaffProps) => {
  const [form] = Form.useForm()

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
              iconInput={<CloseOutlined />}
              onClick={props.cancel}
            />
            <AddButton
              key='add'
              label='Lưu'
              iconInput={<CheckOutlined />}
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
                  defaultValue={props?.extraData?.name ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Ngày sinh'
                name='dateOfBirth'
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
                  defaultValue={
                    props.extraData?.dateOfBirth &&
                    dayjs(
                      formatDate(props.extraData?.dateOfBirth),
                      'DD/MM/YYYY'
                    )
                  }
                  format={'DD/MM/YYYY'}
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
                  defaultValue={props?.extraData?.homeTown ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Căn cước'
                name='citizeId'
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
                  defaultValue={props?.extraData?.citizenId ?? ''}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                  defaultValue={props?.extraData?.phone ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Nơi làm việc'
                name='workingLocation'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên nơi làm việc'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.workingLocation ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Vị trí'
                name='role'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <Input
                  placeholder='Nhập tên vị trí'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.role ?? ''}
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
                  defaultValue={props?.extraData?.salary ?? ''}
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
                  defaultValue={props.extraData?.street}
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
                  defaultValue={props.extraData?.ward}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
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
                  defaultValue={props.extraData?.province}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddEditStaff
