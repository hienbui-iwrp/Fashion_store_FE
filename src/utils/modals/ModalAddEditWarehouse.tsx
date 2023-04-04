import React, { useEffect, useState } from 'react'
import { Modal, Space, Form, Input, InputNumber, Row, Col } from 'antd'
import { AddButton, RemoveButton } from '@/components'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '@/styles/Admin.module.css'
import {
  ModalAddEditWarehouseProps,
  StaffProps,
  WarehouseProps,
  formatStaffDataXML,
} from '..'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import {
  addWarehouseBFF,
  getWarehouseManagerBFF,
  getWarehouseStaffBFF,
  updateWarehouseBFF,
} from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'
import { useRouter } from 'next/router'

dayjs.extend(customParseFormat)

const ModalAddEditWarehouse = (props: ModalAddEditWarehouseProps) => {
  const [form] = Form.useForm()
  const initialValues = {
    ...props.extraData,
  }
  const [manager, setManager] = useState<StaffProps>()
  const [staff, setStaff] = useState<StaffProps[]>()

  const dispatch = useDispatch()

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      if (!props.extraData) {
        addWarehouseBFF(values)
          .then((data: any) => {
            if (data.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('Đã thêm kho mới'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
      } else {
        const warehouse: WarehouseProps = {
          id: values.id && values.id != '' ? values.id : props.extraData.id,
          name:
            values.name && values.name != ''
              ? values.name
              : props.extraData.name,
          street:
            values.street && values.street != ''
              ? values.street
              : props.extraData.street,
          ward:
            values.ward && values.ward != ''
              ? values.ward
              : props.extraData.ward,
          district:
            values.district && values.district != ''
              ? values.district
              : props.extraData.district,
          province:
            values.province && values.province != ''
              ? values.province
              : props.extraData.province,
          capacity:
            values.capacity && values.capacity != ''
              ? values.capacity
              : props.extraData.capacity,
          createdDate: new Date(),
        }

        await updateWarehouseBFF(props.extraData.id, warehouse)
          .then((res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('Đã cập nhật thông tin'))
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
      }

      props.callback && props.callback({})
      props.cancel && props.cancel()

      console.log('Success', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  const getData = async () => {
    await getWarehouseStaffBFF(props.extraData?.id)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')

        const _data = res.Data.map((item: StaffProps) =>
          formatStaffDataXML(item)
        )
        setStaff(_data)
      })
      .catch((err) => console.log(err))

    await getWarehouseManagerBFF(props.extraData?.id)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')

        const _data = formatStaffDataXML(res.Data[0])
        setManager(_data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (props.extraData) {
      getData()
    }
  }, [])

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
              onClick={onSave}
            />
          </Space>,
        ]}
      >
        {props.extraData && (
          <>
            <Row className='pl-4 mb-2'>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Mã kho:</span>
              </Col>
              <Col span={16}>{props.extraData?.id ?? ''}</Col>
            </Row>
            <Row className='pl-4 mb-2'>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Quản lý:</span>
              </Col>
              <Col span={12}>{manager?.name ?? 'Chưa có'}</Col>
            </Row>
            <Row className='pl-4 mb-4'>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Số nhân viên:</span>
              </Col>
              <Col span={12}>{staff?.length ?? 0}</Col>
            </Row>
          </>
        )}

        <Form
          layout={'vertical'}
          form={form}
          onValuesChange={() => {}}
          initialValues={initialValues}
        >
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
              // defaultValue={props.extraData?.name}
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
                // defaultValue={props.extraData?.street}
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
                // defaultValue={props.extraData?.ward}
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
                // defaultValue={props.extraData?.district}
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
                // defaultValue={props.extraData?.province}
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
              // defaultValue={props.extraData?.capacity}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddEditWarehouse
