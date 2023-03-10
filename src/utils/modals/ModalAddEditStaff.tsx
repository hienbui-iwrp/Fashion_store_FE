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
import { BranchProps, formatBranchData, formatDate } from '..'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { Gender, Routes, StaffRole } from '@/constants'
import { useRouter } from 'next/router'
import { addStaff, getBranch, updateStaff } from '@/api'
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

  const getData = () => {
    getBranch().then((res: any) => {
      const _data = res.data.Data.map((item: any) => {
        if (res.data.StatusCode != 200) throw new Error('FAIL')
        return formatBranchData(item)
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
      console.log(values)

      if (!props.extraData) {
        addStaff(values)
          .then((res: any) => {
            if (res.data.StatusCode != 200) throw new Error('FAIL')

            dispatch(setNotificationValue('???? th??m nh??n vi??n m???i'))
            routes.push(Routes.admin.staff)
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('C?? l???i khi th???c hi???n'))
          })
      } else {
        updateStaff(props.extraData.id, values)
          .then((res: any) => {
            if (res.data.StatusCode != 200) throw new Error('FAIL')
            dispatch(setNotificationValue('???? c???p nh???t th??ng tin'))
            routes.push(Routes.admin.staff)
          })
          .catch((error) => {
            dispatch(setNotificationType('error'))
            dispatch(setNotificationValue('C?? l???i khi th???c hi???n'))
          })
      }

      props.callback && props.callback({})
      props.cancel && props.cancel()
      routes.push(Routes.admin.staff)

      console.log('Success', values)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo)
    }
  }

  return (
    <>
      <Modal
        title={props.extraData ? 'Ch???nh s???a nh??n vi??n' : 'Th??m nh??n vi??n m???i'}
        centered
        open={props.open}
        onCancel={props.cancel}
        onOk={() => props?.callback}
        footer={[
          <Space key='btn'>
            <RemoveButton
              label='H???y'
              key='cancel'
              iconInput={<CloseOutlined />}
              onClick={props.cancel}
            />
            <AddButton
              key='add'
              label='L??u'
              iconInput={<CheckOutlined />}
              onClick={onSave}
            />
          </Space>,
        ]}
      >
        <Form layout={'vertical'} form={form} onValuesChange={() => {}}>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='H??? t??n'
                name='name'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t??n h??? t??n'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.name ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Ng??y sinh'
                name='birthdate'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <DatePicker
                  className={styles.adminInputShadow}
                  style={{ width: '100%' }}
                  defaultValue={
                    props.extraData?.birthdate &&
                    dayjs(formatDate(props.extraData?.birthdate), 'DD/MM/YYYY')
                  }
                  format={'DD/MM/YYYY'}
                  onChange={(date) => {
                    console.log(
                      date?.year() + '-' + date?.month() + '-' + date?.date()
                    )
                  }}
                />
              </Form.Item>
              <Form.Item
                label='Qu?? qu??n'
                name='hometown'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t??n qu?? qu??n'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.hometown ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='C??n c?????c'
                name='citizenId'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t??n c??n c?????c'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.citizenId ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='Gi???i t??nh'
                name='gender'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <DropdownButton
                  label={
                    Gender.find(
                      (item: any) => item.value === props.extraData?.gender
                    )?.content ?? 'Gi???i t??nh'
                  }
                  items={Gender.map((item) => item.content)}
                  callBack={(gender: any) => {
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
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p email'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.email ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='??i???n tho???i'
                name='phone'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t??n ??i???n tho???i'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.phone ?? ''}
                />
              </Form.Item>
              <Form.Item
                label='N??i l??m vi???c'
                name='branchId'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                {props.extraData ? (
                  curBranch && (
                    <DropdownButton
                      label={curBranch.name}
                      items={branchData?.map((item: BranchProps) => {
                        return `${item.name} (${item.id})`
                      })}
                      callBack={(branch: string) => {
                        form.setFieldValue(
                          'branchId',
                          branchData?.find(
                            (item: any) =>
                              item.id == branch.split(')')[0].split('(')[1]
                          )?.id
                        )
                      }}
                    />
                  )
                ) : (
                  <DropdownButton
                    label={'N??i l??m vi???c'}
                    items={branchData?.map((item: BranchProps) => {
                      return `${item.name} (${item.id})`
                    })}
                    callBack={(branch: string) => {
                      form.setFieldValue(
                        'branchId',
                        branchData?.find(
                          (item: any) =>
                            item.id == branch.split(')')[0].split('(')[1]
                        )?.id
                      )
                    }}
                  />
                )}
              </Form.Item>
              <Form.Item
                label='V??? tr??'
                name='role'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <DropdownButton
                  label={form.getFieldValue('role') ?? 'V??? tr??'}
                  items={Object.keys(StaffRole).map(
                    (item: string) => StaffRole[item]
                  )}
                  callBack={(item: any) => {
                    form.setFieldValue('role', item)
                  }}
                />
                {/* <Input
                  placeholder='Nh???p t??n v??? tr??'
                  className={styles.adminInputShadow}
                  defaultValue={props?.extraData?.role ?? ''}
                /> */}
              </Form.Item>
              <Form.Item
                label='L????ng'
                name='salary'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <InputNumber
                  placeholder='Nh???p l????ng'
                  className={styles.adminInputShadow}
                  style={{ width: '100%' }}
                  defaultValue={props?.extraData?.salary ?? ''}
                />
              </Form.Item>
            </Col>
          </Row>
          <b>?????a ch???</b>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='???????ng'
                name='street'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t??n ???????ng'
                  className={styles.adminInputShadow}
                  defaultValue={props.extraData?.street}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='X??, ph?????ng'
                name='ward'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p x??, ph?????ng'
                  className={styles.adminInputShadow}
                  defaultValue={props.extraData?.ward}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='Huy???n, th??nh ph???'
                name='district'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p huy???n, th??nh ph???'
                  className={styles.adminInputShadow}
                  defaultValue={props.extraData?.district}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Form.Item
                label='T???nh, th??nh ph???'
                name='province'
                rules={[
                  {
                    required: props.extraData ? false : true,
                    message: 'Vui l??ng nh???p',
                  },
                ]}
              >
                <Input
                  placeholder='Nh???p t???nh, th??nh ph???'
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
