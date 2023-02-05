import React, { useEffect, useState } from 'react'
import { BASE_URL, Colors } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import {
  Card,
  Col,
  Row,
  Image,
  List,
  Space,
  Modal,
  Divider,
  DatePicker,
} from 'antd'
import { useRouter } from 'next/router'
import { AddButton, LayoutAdmin, RemoveButton, TableList } from '@/components'
import { useModalConfirm } from '@/hooks'
import {
  formatDate,
  FormatNumber,
  formatTime,
  ModalAddEditStaff,
} from '@/utils'
import { ColumnsType } from 'antd/es/table'
import styles from '@/styles/Admin.module.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

interface DataType {
  id: string
  name: string
  citizenId: string
  phone: string
  address: string
  dateOfBirth: Date
  homeTown: string
  workingLocation: string
  role: string
  salary: number
  startDate: Date
  account?: string
}

interface ItemType {
  name: string
  content: string | number
}

interface AttendanceDataType {
  date: Date
  startTime: Date
  endTime: Date
  total: number
}

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [dataItems1, setDataItems1] = useState<ItemType[]>([])
  const [dataItems2, setDataItems2] = useState<ItemType[]>([])
  const [attendanceData, setAttendanceData] = useState<AttendanceDataType[]>([])
  const [data, setData] = useState<DataType>({})
  const [modalAddEditStaff, setModalAddEditStaff] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const columns: ColumnsType<AttendanceDataType> = []
  if (attendanceData && attendanceData[0]) {
    for (const key in attendanceData[0]) {
      columns.push({
        title:
          key === 'date'
            ? 'Ngày'
            : key === 'startTime'
            ? 'Thời điểm vào'
            : key === 'endTime'
            ? 'Thời điểm ra'
            : 'Thời gian làm',
        dataIndex: key,
        sorter: (a: AttendanceDataType, b: AttendanceDataType) =>
          a[key] > b[key] ? 1 : -1,
        render(text: any, record: AttendanceDataType, index: number) {
          const textShow =
            key === 'date'
              ? formatDate(text)
              : key === 'total'
              ? text
              : formatTime(text)
          return {
            props: {
              style: {
                background: index % 2 ? Colors.white : Colors.adminBackground,
              },
            },
            children: <div>{textShow}</div>,
          }
        },
      })
    }
  }

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/staffManagement/staffDetailData?id=${id}`)
      .then((res) => {
        const _data: DataType = res.data
        setData(res.data)
        setDataItems1([
          { name: 'Mã nhân viên', content: _data.id },
          { name: 'Căn cước', content: _data.citizenId },
          { name: 'Số điện thoại', content: _data.phone },
          { name: 'Địa chỉ', content: _data.address },
          {
            name: 'Ngày sinh',
            content: formatDate(_data.dateOfBirth),
          },
          { name: 'Quê quán', content: _data.homeTown },
        ])
        setDataItems2([
          { name: 'Nơi làm việc', content: _data.workingLocation },
          { name: 'Vị trí', content: _data.role },
          { name: 'Lương', content: FormatNumber(_data.salary) + ' VND' },
          {
            name: 'Ngày bắt đầu',
            content: formatDate(_data.startDate),
          },
          {
            name: 'Tài khoản',
            content: _data.account ?? '',
          },
        ])
        setLoading(false)
      })
  }

  const getAttendacceData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/staffManagement/staffAttendanceData`)
      .then((res) => {
        setAttendanceData(res.data)
      })
  }

  useEffect(() => {
    getData()
    getAttendacceData()
  }, [])

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa nhân viên',
    content: 'Bạn có chắc  chắn muốn xóa nhân viên này?',
    onOk: () => {
      console.log('delete Staff')
    },
  })

  const content = (
    <Space direction='vertical' style={{ width: '99%' }} size='large'>
      <Card
        className='max-w-full-lg'
        title={data?.name?.toUpperCase() ?? 'Không tên'}
        bordered={false}
        loading={loading}
      >
        <Row justify='center' align='middle'>
          <Col xs={24} sm={11}>
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
          <Col xs={24} sm={12}>
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
          </Col>
        </Row>
      </Card>
      <Card>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 10,
            fontSize: 15,
          }}
        >
          <b>Điểm danh</b>
          <span>Số ngày làm 7</span>
          <span>Số ngày nghỉ 0</span>
          <DatePicker
            picker='month'
            placeholder='Month'
            format={'MM/YYYY'}
            // defaultValue={dayjs('01/2022', 'MM/YYYY')}
            className={styles.adminInputShadow}
            onChange={(date, dateString) => {
              console.log(dateString)
            }}
          />
        </div>
        <TableList<AttendanceDataType>
          data={attendanceData ?? []}
          columns={columns}
          loading={loading}
        />
      </Card>
      {modalAddEditStaff && (
        <ModalAddEditStaff
          open={modalAddEditStaff}
          cancel={() => setModalAddEditStaff(false)}
          extraData={data}
        />
      )}
      {contextModalComfirm}
    </Space>
  )

  return <LayoutAdmin content={content} selected={20} />
}

Detail.displayName = 'Staff Detail'

export default Detail
