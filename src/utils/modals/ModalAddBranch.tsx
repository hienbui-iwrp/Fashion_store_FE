import React, { useState } from 'react'
import {
  Col,
  Modal,
  Row,
  Space,
  Image,
  Form,
  Radio,
  Input,
  TimePicker,
} from 'antd'
import { ModalAddBranchProps } from '../types/modalType'
import { AddButton, RemoveButton } from '@/components'
import {
  CheckOutlined,
  CloseOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const ModalAddBranch = (props: ModalAddBranchProps) => {
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
                preview={true}
                src={
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
                <Input placeholder='Nhập tên chi nhánh' />
              </Form.Item>
              <Form.Item label='Địa chỉ'>
                <Input placeholder='Nhập địa chỉ' />
              </Form.Item>
              <Form.Item label='Giờ hoạt động'>
                <Space>
                  <TimePicker
                    defaultValue={dayjs('8:30', 'HH:mm ')}
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
                  />
                  <TimePicker
                    defaultValue={dayjs('19:30', 'HH:mm ')}
                    format={'HH:mm'}
                    onOk={(item) => console.log(item.hour(), item.minute())}
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

export default ModalAddBranch
