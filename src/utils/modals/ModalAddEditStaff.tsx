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
import { BranchProps, formatBranchDataXML, formatDate } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { Gender, Routes, StaffRole } from '@/constants'
import { useRouter } from 'next/router'
import { addStaffBFF, getBranchBff, updateStaffBFF } from '@/api'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const ModalAddEditStaff = (props: ModalAddEditStaffProps) => {
  const routes = useRouter()
  const [form] = Form.useForm()
  const [branchData, setBranchData] = useState<BranchProps[]>()
  const [curBranch, setCurBranch] = useState<BranchProps>()
  const dispatch = useDispatch()

  const initialValues = {
    ...props.extraData,
    birthdate:
      props.extraData?.birthdate &&
      dayjs(formatDate(props.extraData?.birthdate), 'DD/MM/YYYY'),
  }

  const getData = () => {
    getBranchBff().then((res: any) => {
      const _data = res.Data.map((item: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        return formatBranchDataXML(item)
      })
      setBranchData(_data)
      setCurBranch(
        _data?.find((item: any) => {
          return item.id.toString() == props.extraData?.branchId
        })
      )
    })
  }

  // get data
  useEffect(() => {
    getData()
  }, [])

  const onSave = async () => {
    try {
      const values = await form.validateFields()
      // await addAccountBff('a', '123456', form.getFieldValue('role'))

      if (!props.extraData) {
        await addStaffBFF(values)
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('Đã thêm nhân viên mới'))
            routes.push(Routes.admin.staff)
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('Có lỗi khi thực hiện'))
          })
      } else {
        await updateStaffBFF(props.extraData.id, values)
          .then(async (res: any) => {
            if (res.StatusCode != 200) throw new Error('FAIL')

            dispatch(setNotificationValue('Đã cập nhật thông tin'))
            routes.push(Routes.admin.staff)
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
        <Form
          layout={'vertical'}
          form={form}
          onValuesChange={() => {}}
          initialValues={initialValues}
        >
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
                label='Nơi làm việc'
                name='branchId'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui lòng nhập',
                  },
                ]}
              >
                <DropdownButton
                  label={curBranch ? curBranch.name : 'Nơi làm việc'}
                  items={branchData?.map((item: BranchProps) => {
                    return `${item.name} (${item.id})`
                  })}
                  callback={(branch: string) => {
                    form.setFieldValue(
                      'branchId',
                      branchData?.find(
                        (item: any) =>
                          item.id == branch.split(')')[0].split('(')[1]
                      )?.id
                    )
                  }}
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
                <DropdownButton
                  label={form.getFieldValue('role') ?? 'Vị trí'}
                  items={StaffRole.map((item: any) => item.content)}
                  callback={(i: any) => {
                    const role = StaffRole.find(
                      (item: any) => item.content == i
                    )?.value
                    form.setFieldValue('role', role)
                  }}
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

export default ModalAddEditStaff
