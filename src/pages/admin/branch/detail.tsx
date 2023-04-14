import React, { useEffect, useMemo, useState } from 'react'
import { BASE_URL, Routes } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddEditBranch } from '@/utils/modals'
import { useModalConfirm } from '@/hooks'
import {
  BranchProps,
  StatisticData,
  formatAddress,
  formatDate,
  formatTime,
} from '@/utils'
import { useDispatch } from 'react-redux'
import {
  setNotificationType,
  setNotificationValue,
} from '@/redux/slices/notificationSlice'
import {
  formatBranchDataXML,
  formatStatisticDataXML,
} from '@/utils/formats/formatData'
import {
  deleteBranchBff,
  getBranchDetailBff,
  getBranchStaffBff,
  getStatisticAllBFF,
} from '@/api'

interface ItemType {
  name: string
  content: string
}

const Detail = () => {
  const [loading, setLoading] = useState(true)
  const [dataItems, setDataItems] = useState<ItemType[]>([])
  const [statisticData, setStatisticData] = useState<StatisticData[]>([])
  const [data, setData] = useState<BranchProps>()
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)

  const dispatch = useDispatch()

  const routes = useRouter()
  const { id } = routes.query

  const getTime = () => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const startDate = new Date(year, month, 1) // Lưu ý: tháng trong JavaScript bắt đầu từ 0
    const endDate = new Date(year, month + 1, 0)
    return {
      startOfMonth: startDate,
      endOfMonth: endDate,
    }
  }

  const getData = async () => {
    let _data: BranchProps = {}

    await getBranchDetailBff(id).then((data: any) => {
      if (data.getElementsByTagName('BranchCode')[0].value == 0)
        routes.push(Routes.error)
      _data = formatBranchDataXML(data)
    })

    await getBranchStaffBff(id).then((res: any) => {
      _data.staff = res.Data.length
    })
    setData(_data)

    await getStatisticAllBFF({
      start: getTime().startOfMonth,
      end: getTime().endOfMonth,
      branch: id?.toString(),
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setStatisticData(_data)
        console.log(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (id) {
      getData()
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (data) {
      setDataItems([
        { name: 'Mã chi nhánh', content: data.id ?? '' },
        { name: 'Địa chỉ', content: formatAddress(data) },
        { name: 'Quản lý', content: data.manager ?? 'Chưa có' },
        {
          name: 'Nhân viên',
          content: data?.staff?.toString() ?? '0',
        },
        {
          name: 'Giờ hoạt động',
          content:
            formatTime(new Date(data.openTime ?? '')) +
            ' - ' +
            formatTime(new Date(data.closeTime ?? '')),
        },
        {
          name: 'Ngày thành lập',
          content: formatDate(new Date(data.createdAt ?? '')),
        },
      ])
    }
  }, [data])

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: async () => {
      deleteBranchBff(id)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')

          routes.push(Routes.admin.branch)
          dispatch(setNotificationValue('Xóa chi nhánh thành công'))
        })
        .catch((error) => {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationValue('Có lỗi khi thực hiện'))
        })
    },
  })

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
            <Col xs={24} sm={12}>
              <Image
                alt='img'
                preview={true}
                src={
                  data?.image ??
                  'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'
                }
                width={'80%'}
              />
            </Col>
            <Col xs={24} sm={12}>
              <List
                bordered={false}
                dataSource={dataItems ?? []}
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
              <Row justify='end' align='bottom'>
                <Space size={20}>
                  <RemoveButton onClick={showModelConfirm} />
                  <AddButton
                    label='Chỉnh sửa'
                    icon={<EditFilled />}
                    onClick={() => setModalAddEditBranch(true)}
                  />
                </Space>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card className='!max-w-full-lg'>
          <LineChart data={statisticData} revenue={true} profit={true} />
        </Card>
        {modalAddEditBranch && (
          <ModalAddEditBranch
            open={modalAddEditBranch}
            cancel={() => setModalAddEditBranch(false)}
            extraData={data}
          />
        )}
        {contextModalComfirm}
      </Space>
    </>
  )
}

Detail.displayName = 'Branch Detail'

export default Detail
