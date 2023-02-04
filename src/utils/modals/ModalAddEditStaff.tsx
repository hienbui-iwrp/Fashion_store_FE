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
        title=''
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
            <AddButton key='add' label='Lưu' iconInput={<CheckOutlined />} />
          </Space>,
        ]}
      >
        <Row>
          <Col xs={24} sm={12} style={{ paddingLeft: 5, paddingRight: 15 }}>
            <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
              <Form.Item label='Họ tên'>
                <Input
                  placeholder='Nhập tên họ tên'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.name ?? ''}
                />
              </Form.Item>
              <Form.Item label='Ngày sinh' valuePropName='date'>
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
              <Form.Item label='Quê quán'>
                <Input
                  placeholder='Nhập tên quê quán'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.homeTown ?? ''}
                />
              </Form.Item>
              <Form.Item label='Căn cước'>
                <Input
                  placeholder='Nhập tên căn cước'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.citizenId ?? ''}
                />
              </Form.Item>
              <Form.Item label='Điện thoại'>
                <Input
                  placeholder='Nhập tên điện thoại'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.phone ?? ''}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={12} style={{ paddingLeft: 15, paddingRight: 5 }}>
            <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
              <Form.Item label='Địa chỉ'>
                <Input
                  placeholder='Nhập tên địa chỉ'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.address ?? ''}
                />
              </Form.Item>
              <Form.Item label='Nơi làm việc'>
                <Input
                  placeholder='Nhập tên nơi làm việc'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.workingLocation ?? ''}
                />
              </Form.Item>
              <Form.Item label='Vị trí'>
                <Input
                  placeholder='Nhập tên vị trí'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.role ?? ''}
                />
              </Form.Item>
              <Form.Item label='Lương'>
                <InputNumber
                  placeholder='Nhập lương'
                  className={styles.adminInputShadow}
                  style={{ width: '100%' }}
                  defaultValue={props?.extraData?.salary ?? ''}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ModalAddEditStaff
