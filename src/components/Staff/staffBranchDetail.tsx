import React, { useEffect, useState } from 'react'
import { Gender, Routes, StaffRole } from '@/constants'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Space, Divider, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import { AddButton, RemoveButton, TableList } from '@/components'
import { useModalConfirm } from '@/hooks'
import {
  AttendanceProps,
  BranchProps,
  formatAddress,
  formatAttendanceDataXML,
  formatBranchDataXML,
  formatDate,
  formatNumber,
  formatStaffDataXML,
  formatTime,
  ModalAddEditStaff,
  StaffProps,
} from '@/utils'
import { ColumnsType } from 'antd/es/table'
import {
  createDeleteRequest,
  deleteStaffBFF,
  getAttendaceBff,
  getBranchDetailBff,
  getStaffDetailBFF,
} from '@/api'
import styles from '@/styles/Admin.module.css'
import dayjs from 'dayjs'

import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { useDispatch } from 'react-redux'
import { setNotificationType, setNotificationValue } from '@/redux'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

export const StaffBranchDetail = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<StaffProps>({})
  const dispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa nhân viên',
    content: 'Bạn có chắc chắn muốn yêu cầu xóa nhân viên này?',
    onOk: () => {
      createDeleteRequest(id)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          router.push(Routes.branchLeader.staff)
          dispatch(setNotificationValue('Đã gửi yêu cầu thành công'))
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    },
  })

  const getData = async () => {
    await getStaffDetailBFF(id)
      .then((res: any) => {
        const _data = formatStaffDataXML(res.Data[0])
        setData(_data)
      })

      .catch((err) => console.log(err))
    setLoading(false)
  }

  useEffect(() => {
    if (id) {
      getData()
    }
  }, [id])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card
          className='max-w-full-lg'
          title={data?.name?.toUpperCase() ?? 'Không tên'}
          bordered={false}
          loading={loading}
        >
          <Row justify='center' align='middle'>
            <Col xs={24} sm={13}>
              <Row>
                <Col xs={24} sm={22}>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Mã nhân viên</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {data.id}
                    </Col>
                  </Row>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Địa chỉ</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {formatAddress(data)}
                    </Col>
                  </Row>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Giới tính</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {Gender.find((item: any) => item.value === data.gender)
                        ?.content ?? 'Chưa xác định'}
                    </Col>
                  </Row>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Số điện thoại</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {data.phone}
                    </Col>
                  </Row>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Căn cước</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {data.citizenId}
                    </Col>
                  </Row>
                  <Row style={{ padding: 8 }}>
                    <Col xs={24} lg={8}>
                      <b>Ngày sinh</b>
                    </Col>
                    <Col xs={24} lg={16}>
                      {formatDate(data.birthdate)}
                    </Col>
                  </Row>
                </Col>
                <Col xs={0} sm={2}>
                  <Divider
                    type='vertical'
                    style={{
                      height: '100%',
                      backgroundColor: '#aaa',
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={10}>
              <Row style={{ padding: 8 }}>
                <Col xs={24} lg={8}>
                  <b>Email</b>
                </Col>
                <Col xs={24} lg={16}>
                  {data.email}
                </Col>
              </Row>
              <Row style={{ padding: 8 }}>
                <Col xs={24} lg={8}>
                  <b>Quê quán</b>
                </Col>
                <Col xs={24} lg={16}>
                  {data.hometown}
                </Col>
              </Row>
              <Row style={{ padding: 8 }}>
                <Col xs={24} lg={8}>
                  <b>Vị trí</b>
                </Col>
                <Col xs={24} lg={16}>
                  {StaffRole.find((item: any) => item.value == data.role)
                    ?.content ?? 'Nhân viên'}
                </Col>
              </Row>
              <Row style={{ padding: 8 }}>
                <Col xs={24} lg={8}>
                  <b>Lương</b>
                </Col>
                <Col xs={24} lg={16}>
                  {formatNumber(data.salary) + ' VND'}
                </Col>
              </Row>
              <Row style={{ padding: 8 }}>
                <Col xs={24} lg={8}>
                  <b>Ngày bắt đầu</b>
                </Col>
                <Col xs={24} lg={16}>
                  {formatDate(data.startDate)}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify='end' align='bottom'>
            <Space size={20}>
              <RemoveButton onClick={showModelConfirm} />
            </Space>
          </Row>
        </Card>
        {contextModalComfirm}
      </Space>
    </>
  )
}
