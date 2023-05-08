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

export const StaffDetail = (props: { role?: number }) => {
  const [loading, setLoading] = useState(true)
  const [attendanceData, setAttendanceData] = useState<AttendanceProps[]>([])
  const [attendanceShowData, setAttendanceShowData] = useState<
    AttendanceProps[]
  >([])
  const [data, setData] = useState<StaffProps>({})
  const [branchData, setBranchData] = useState<BranchProps>({})
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)
  const dispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  // const columns: ColumnsType<AttendanceProps> = []
  // if (attendanceShowData && attendanceShowData[0]) {
  //   columns.push({
  //     title: 'Ngày',
  //     dataIndex: 'date',
  //     sorter: (a: AttendanceProps, b: AttendanceProps) =>
  //       (a.date ?? 1) > (b.date ?? 1) ? 1 : -1,
  //     render(text: any, record: AttendanceProps, index: number) {
  //       return formatDate(text)
  //     },
  //     onCell: (record) => {
  //       return {
  //         style: { minWidth: 120 },
  //       }
  //     },
  //   })

  //   columns.push({
  //     title: 'Thời điểm vào',
  //     dataIndex: 'checkIn',
  //     sorter: (a: AttendanceProps, b: AttendanceProps) =>
  //       (a.checkIn ?? 1) > (b.checkIn ?? 1) ? 1 : -1,
  //     render(text: any, record: AttendanceProps, index: number) {
  //       return formatTime(text)
  //     },
  //     onCell: (record) => {
  //       return {
  //         style: { minWidth: 140 },
  //       }
  //     },
  //   })

  //   columns.push({
  //     title: 'Thời điểm ra',
  //     dataIndex: 'checkOut',
  //     sorter: (a: AttendanceProps, b: AttendanceProps) =>
  //       (a.checkOut ?? 1) > (b.checkOut ?? 1) ? 1 : -1,
  //     render(text: any, record: AttendanceProps, index: number) {
  //       return formatTime(text)
  //     },
  //     onCell: (record) => {
  //       return {
  //         style: { minWidth: 120 },
  //       }
  //     },
  //   })

  //   columns.push({
  //     title: 'Thời gian làm',
  //     dataIndex: '',
  //     sorter: (a: AttendanceProps, b: AttendanceProps) =>
  //       getWorkingTime(a.checkIn, a.checkOut) >
  //       getWorkingTime(b.checkIn, b.checkOut)
  //         ? 1
  //         : -1,
  //     render(text: any, record: AttendanceProps, index: number) {
  //       return getWorkingTime(record.checkIn, record.checkOut)
  //     },
  //     onCell: (record) => {
  //       return {
  //         style: { minWidth: 120 },
  //       }
  //     },
  //   })
  // }

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa nhân viên',
    content: 'Bạn có chắc  chắn muốn xóa nhân viên này?',
    onOk: () => {
      deleteStaffBFF(id)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')
          router.push(Routes.admin.staff)
          dispatch(setNotificationValue('Xóa nhân viên thành công'))
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

  const getBranchData = async () => {
    await getBranchDetailBff(data.branchId)
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error()
        const _branchData = formatBranchDataXML(res.Data[0])
        setBranchData(_branchData)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // console.log('branch: --', data.branchId, branchData)

  const getAttendacceData = () => {
    getAttendaceBff(id).then((res: any) => {
      const _attendacceData: AttendanceProps[] = res.Data.map((item: any) => {
        return formatAttendanceDataXML(item)
      })
      setAttendanceShowData(
        _attendacceData.filter((item: AttendanceProps) => {
          return item.date?.getMonth() == new Date().getMonth()
        })
      )

      setAttendanceData(_attendacceData)
    })
  }

  useEffect(() => {
    if (id) {
      getData()
      getAttendacceData()
    }
  }, [id])

  useEffect(() => {
    if (data.branchId) {
      getBranchData()
    }
  }, [data.branchId])

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
                  <b>Nơi làm việc</b>
                </Col>
                <Col xs={24} lg={16}>
                  {branchData.name ?? 'Toàn hệ thống'}
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
              <AddButton
                label='Chỉnh sửa'
                icon={<EditFilled />}
                onClick={() => setModalAddEditStaff(true)}
              />
            </Space>
          </Row>
        </Card>
        {/* <TableList<AttendanceProps>
          data={attendanceShowData ?? []}
          columns={columns}
          loading={loading}
          rowKey={['date']}
          header={
            <Row>
              <Col xs={12} lg={6} className='mt-2'>
                <b>Điểm danh</b>
              </Col>
              <Col xs={12} lg={14} className='mt-2'>
                <span>Số ngày làm {countWorkingDate(attendanceShowData)}</span>
              </Col>
              <Col xs={12} sm={8} lg={4} className='mt-2'>
                <DatePicker
                  picker='month'
                  placeholder='Month'
                  format={'MM/YYYY'}
                  defaultValue={dayjs(formatDate(new Date()), 'DD/MM/YYYY')}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    setAttendanceShowData(
                      attendanceData.filter((item: AttendanceProps) => {
                        return item.date?.getMonth() == date?.month()
                      })
                    )
                  }}
                />
              </Col>
            </Row>
          }
        /> */}
        {modalAddEditStaff && (
          <ModalAddEditStaff
            open={modalAddEditStaff}
            cancel={() => setModalAddEditStaff(false)}
            extraData={data}
          />
        )}
        {contextModalComfirm}
      </Space>
    </>
  )
}
