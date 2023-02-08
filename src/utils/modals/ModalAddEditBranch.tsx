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

dayjs.extend(customParseFormat)

const ModalAddEditBranch = (props: ModalAddEditBranchProps) => {
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
            ,
            <AddButton key='add' label='Lưu' iconInput={<CheckOutlined />} />
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
              <Form.Item label='Tên chi nhánh'>
                <Input
                  placeholder='Nhập tên chi nhánh'
                  className={styles.adminInputShadow}
                  defaultValue={props.extraData?.name}
                />
              </Form.Item>
              <Form.Item label='Địa chỉ'>
                <Input
                  placeholder='Nhập địa chỉ'
                  className={styles.adminInputShadow}
                  defaultValue={props.extraData?.address}
                />
              </Form.Item>
              <Form.Item label='Giờ hoạt động'>
                <Space>
                  <TimePicker
                    defaultValue={
                      props.extraData?.startTime &&
                      dayjs(formatTime(props.extraData?.startTime), 'HH:mm ')
                    }
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
                    className={styles.adminInputShadow}
                  />
                  <TimePicker
                    defaultValue={
                      props.extraData?.endTime &&
                      dayjs(formatTime(props.extraData?.endTime), 'HH:mm ')
                    }
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
                    className={styles.adminInputShadow}
                  />
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ModalAddEditBranch
