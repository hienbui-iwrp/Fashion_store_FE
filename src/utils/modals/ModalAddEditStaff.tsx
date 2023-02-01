import React, { useState } from 'react'
import { Col, Modal, Row, Space, Form, Input, TimePicker } from 'antd'
import { ModalAddEditBranchProps } from '../types/modalType'
import { AddButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from '@/styles/Admin.module.css'

dayjs.extend(customParseFormat)

const ModalAddEditStaff = (props: ModalAddEditBranchProps) => {
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
                />
              </Form.Item>
              <Form.Item label='Ngày sinh'>
                <Input
                  placeholder='Nhập tên ngày sinh'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item label='Quê quán'>
                <Input
                  placeholder='Nhập tên quê quán'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item label='Căn cước'>
                <Input
                  placeholder='Nhập tên căn cước'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item label='Điện thoại'>
                <Input
                  placeholder='Nhập tên điện thoại'
                  className={styles.adminInputShadow}
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
                />
              </Form.Item>
              <Form.Item label='Nơi làm việc'>
                <Input
                  placeholder='Nhập tên nơi làm việc'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item label='Vị trí'>
                <Input
                  placeholder='Nhập tên vị trí'
                  className={styles.adminInputShadow}
                />
              </Form.Item>
              <Form.Item label='Lương'>
                <Input
                  placeholder='Nhập tên lương'
                  className={styles.adminInputShadow}
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
