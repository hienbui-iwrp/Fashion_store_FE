import React, { useEffect, useState } from 'react'
import { BASE_URL, Gender, Routes } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, List, Space, Divider, DatePicker } from 'antd'
import { useRouter } from 'next/router'
import { AddButton, LayoutAdmin, RemoveButton, TableList } from '@/components'
import { useModalConfirm } from '@/hooks'
import {
  apiStaffService,
  AttendanceProps,
  BranchProps,
  formatAddress,
  formatBranchData,
  formatDate,
  formatNumber,
  formatStaffData,
  formatTime,
  ModalAddEditStaff,
  StaffProps,
} from '@/utils'
import { ColumnsType } from 'antd/es/table'
import {
  deleteStaff,
  getAttendace,
  getBranchDetail,
  getStaffDetail,
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

interface ItemType {
  name: string
  content: string | number
}

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [dataItems1, setDataItems1] = useState<ItemType[]>([])
  const [dataItems2, setDataItems2] = useState<ItemType[]>([])
  const [attendanceData, setAttendanceData] = useState<AttendanceProps[]>([])
  const [attendanceShowData, setAttendanceShowData] = useState<
    AttendanceProps[]
  >([])
  const [data, setData] = useState<StaffProps>({})
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)
  const dispatch = useDispatch()

  const router = useRouter()
  const { id } = router.query

  const columns: ColumnsType<AttendanceProps> = []
  if (attendanceShowData && attendanceShowData[0]) {
    columns.push({
      title: 'Ngày',
      dataIndex: 'date',
      sorter: (a: AttendanceProps, b: AttendanceProps) =>
        (a.date ?? 1) > (b.date ?? 1) ? 1 : -1,
      render(text: any, record: AttendanceProps, index: number) {
        return {
          children: <div>{formatDate(text)}</div>,
        }
      },
    })

    columns.push({
      title: 'Thời điểm vào',
      dataIndex: 'checkIn',
      sorter: (a: AttendanceProps, b: AttendanceProps) =>
        (a.checkIn ?? 1) > (b.checkIn ?? 1) ? 1 : -1,
      render(text: any, record: AttendanceProps, index: number) {
        return {
          children: <div>{formatTime(text)}</div>,
        }
      },
    })

    columns.push({
      title: 'Thời điểm ra',
      dataIndex: 'checkOut',
      sorter: (a: AttendanceProps, b: AttendanceProps) =>
        (a.checkOut ?? 1) > (b.checkOut ?? 1) ? 1 : -1,
      render(text: any, record: AttendanceProps, index: number) {
        return {
          children: <div>{formatTime(text)}</div>,
        }
      },
    })

    columns.push({
      title: 'Thời gian làm',
      dataIndex: '',
      sorter: (a: AttendanceProps, b: AttendanceProps) =>
        getWorkingTime(a.checkIn, a.checkOut) >
        getWorkingTime(b.checkIn, b.checkOut)
          ? 1
          : -1,
      render(text: any, record: AttendanceProps, index: number) {
        return {
          children: (
            <div>{getWorkingTime(record.checkIn, record.checkOut)}</div>
          ),
        }
      },
    })
  }

  const setListData = (data: StaffProps, branch: BranchProps) => {
    setDataItems1([
      { name: 'Mã nhân viên', content: data.id ?? '' },
      { name: 'Địa chỉ', content: formatAddress(data) },
      {
        name: 'Giới tính',
        content:
          Gender.find((item: any) => item.value === data.gender)?.content ??
          'Chưa xác định',
      },
      { name: 'Số điện thoại', content: data.phone ?? '' },
      { name: 'Căn cước', content: data.citizenId ?? '' },
      {
        name: 'Ngày sinh',
        content: formatDate(data.birthdate),
      },
      { name: 'Email', content: data.email ?? '' },
    ])
    setDataItems2([
      { name: 'Quê quán', content: data.hometown ?? '' },
      { name: 'Nơi làm việc', content: branch.name ?? '' },
      { name: 'Vị trí', content: data.role ?? '' },
      { name: 'Lương', content: formatNumber(data.salary) + ' VND' },
      {
        name: 'Ngày bắt đầu',
        content: formatDate(data.startDate),
      },
      {
        name: 'Tài khoản',
        content: data.account ?? 'Không có',
      },
    ])
  }

  const getData = async () => {
    // let staffData: StaffProps = {}
    await getStaffDetail(id).then((res: any) => {
      if (res.data.Data.Status == 'res.data.Data') router.push(Routes.error)
      const _data = formatStaffData(res.data.Data)
      setData(_data)
    })
    setLoading(false)
  }

  const getAttendacceData = () => {
    getAttendace(id).then((res: any) => {
      const _attendacceData: AttendanceProps[] = res.data.Data.map(
        (item: any) => {
          return {
            date: new Date(item.AttendanceDate),
            checkIn: new Date(item.CheckinTime),
            checkOut: new Date(item.CheckoutTime),
          }
        }
      )

      setAttendanceShowData(
        _attendacceData.filter((item: AttendanceProps) => {
          return item.date?.getMonth() == new Date().getMonth()
        })
      )

      setAttendanceData(_attendacceData)
    })
  }

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa nhân viên',
    content: 'Bạn có chắc  chắn muốn xóa nhân viên này?',
    onOk: () => {
      deleteStaff(id)
        .then((res: any) => {
          if (res.data.StatusCode != 200) throw new Error('FAIL')
          router.push(Routes.admin.staff)
          dispatch(setNotificationValue('Xóa nhân viên thành công'))
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    },
  })

  useEffect(() => {
    if (id) {
      getData()
      getAttendacceData()
    }
  }, [id])

  useEffect(() => {
    if (data) {
      getBranchDetail(data.branchId).then((res: any) => {
        const _data = formatBranchData(res.data.Data)
        setListData(data, _data)
      })
    }
  }, [data])

  return (
    <>
      {' '}
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
                <Col xs={24} sm={23}>
                  <List
                    bordered={false}
                    dataSource={dataItems1 ?? []}
                    renderItem={(item) => {
                      return (
                        <Row style={{ padding: 8 }}>
                          <Col xs={24} lg={8}>
                            <b>{item.name}</b>
                          </Col>
                          <Col xs={24} lg={16}>
                            {item.content}
                          </Col>
                        </Row>
                      )
                    }}
                  />
                </Col>
                <Col xs={0} sm={1}>
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
              <List
                bordered={false}
                dataSource={dataItems2 ?? []}
                renderItem={(item) => {
                  return (
                    item && (
                      <Row style={{ padding: 8 }}>
                        <Col xs={24} lg={8}>
                          <b>{item.name}</b>
                        </Col>
                        <Col xs={24} lg={16}>
                          {item.content}
                        </Col>
                      </Row>
                    )
                  )
                }}
              />
            </Col>
          </Row>
          <Row justify='end' align='bottom'>
            <Space size={20}>
              <RemoveButton onClick={showModelConfirm} />
              <AddButton
                label='Chỉnh sửa'
                iconInput={<EditFilled />}
                onClick={() => setModalAddEditStaff(true)}
              />
            </Space>
          </Row>
        </Card>
        <TableList<AttendanceProps>
          data={attendanceShowData ?? []}
          columns={columns}
          loading={loading}
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
        />
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

Detail.displayName = 'Staff Detail'

export default Detail

const getWorkingTime = (start: any, end: any) => {
  const a = new Date(start).valueOf()
  const b = new Date(end).valueOf()
  return (Math.abs(b - a) / 3600000.0 - 1).toFixed(1)
}

const countWorkingDate = (data: AttendanceProps[]) => {
  return data.filter((item: AttendanceProps) => {
    return item.date
  }).length
}
