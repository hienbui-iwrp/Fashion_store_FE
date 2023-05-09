import React, { useEffect, useState } from 'react'
import { Routes } from '@/constants'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Space } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, RemoveButton } from '@/components'
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
  formatStaffDataXML,
  formatStatisticDataXML,
} from '@/utils/formats/formatData'
import {
  deleteBranchBff,
  getBranchDetailBff,
  getBranchStaffBff,
  getStaffDetailBFF,
  getStatisticAllBFF,
} from '@/api'

export const BranchDetail = (props: { role?: number }) => {
  const [loading, setLoading] = useState(true)
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
      _data = formatBranchDataXML(data.Data[0])
      if (!_data) routes.push(Routes.error)
    })

    await getBranchStaffBff(id).then((res: any) => {
      _data.staff = res.Data.length
    })
    setData(_data)

    await getStaffDetailBFF(_data.manager)
      .then((res: any) => {
        const staff = formatStaffDataXML(res.Data[0])
        _data.manager = staff.name + ' (' + staff.id + ')'
      })
      .catch((err) => {
        _data.manager = 'Chưa có'
      })

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

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: async () => {
      deleteBranchBff(id)
        .then((res: any) => {
          if (res.StatusCode != 200) throw new Error('FAIL')

          if (props?.role == 3) {
            routes.push(Routes.branchManager.branch)
          } else routes.push(Routes.admin.branch)
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
          <Row justify='center' align='middle' className='px-4'>
            <Col xs={24} sm={14}>
              <Row className='m-4'>
                <Col xs={24} lg={7}>
                  <b>{'Mã chi nhánh'}</b>
                </Col>
                <Col xs={24} lg={17}>
                  {data?.id}
                </Col>
              </Row>
              <Row className='m-4'>
                <Col xs={24} lg={7}>
                  <b>{'Địa chỉ'}</b>
                </Col>
                <Col xs={24} lg={17}>
                  {formatAddress(data)}
                </Col>
              </Row>
              <Row className='m-4'>
                <Col xs={24} lg={7}>
                  <b>{'Quản lý'}</b>
                </Col>
                <Col xs={24} lg={17}>
                  {data?.manager ?? 'Chưa có'}
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={10}>
              <Row className='m-4'>
                <Col xs={24} lg={8}>
                  <b>{'Số nhân viên'}</b>
                </Col>
                <Col xs={24} lg={16}>
                  {data?.staff?.toString() ?? '0'}
                </Col>
              </Row>
              <Row className='m-4'>
                <Col xs={24} lg={8}>
                  <b>{'Giờ hoạt động'}</b>
                </Col>
                <Col xs={24} lg={16}>
                  {formatTime(new Date(data?.openTime ?? '')) +
                    ' - ' +
                    formatTime(new Date(data?.closeTime ?? ''))}
                </Col>
              </Row>
              <Row className='m-4'>
                <Col xs={24} lg={8}>
                  <b>{'Ngày thành lập'}</b>
                </Col>
                <Col xs={24} lg={16}>
                  {formatDate(new Date(data?.createdAt ?? ''))}
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
                onClick={() => setModalAddEditBranch(true)}
              />
            </Space>
          </Row>
        </Card>
        <Card className='!max-w-full-lg'>
          <b>Hoạt động tháng này</b>
          <LineChart data={statisticData} revenue={true} profit={true} />
        </Card>
        {modalAddEditBranch && (
          <ModalAddEditBranch
            open={modalAddEditBranch}
            cancel={() => setModalAddEditBranch(false)}
            extraData={data}
            callback={() => {
              if (props?.role == 3) {
                routes.push(Routes.branchManager.branch)
              } else routes.push(Routes.admin.branch)
            }}
          />
        )}
        {contextModalComfirm}
      </Space>
    </>
  )
}
