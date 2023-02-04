import React, { useEffect, useState } from 'react'
import { BASE_URL } from '@/constants'
import axios from 'axios'
import { EditFilled } from '@ant-design/icons'
import { Card, Col, Row, Image, List, Space, Modal } from 'antd'
import { useRouter } from 'next/router'
import { LineChart } from '@/components/LineChart'
import { AddButton, LayoutAdmin, RemoveButton } from '@/components'
import { ModalAddEditBranch } from '@/utils/modals'
import { useModalConfirm } from '@/hooks'
import { formatTime } from '@/utils'

interface DataType {
  id: string
  name: string
  address: string
  manager: string
  area: number
  staff: number
  startTime: Date
  endTime: Date
  image?: string
}

interface ItemType {
  name: string
  content: string
}

interface StatisticDataType {
  revenue?: number
  profit?: number
  date: Date
}

const BranchDetail = () => {
  const [loading, setLoading] = useState(true)
  const [dataItems, setDataItems] = useState<ItemType[]>([])
  const [statisticData, setStatisticData] = useState<StatisticDataType[]>([])
  const [data, setData] = useState<DataType>()
  const [modalAddEditBranch, setModalAddEditBranch] = useState(false)

  const router = useRouter()
  const { id } = router.query

  const getData = async () => {
    await axios
      .get(`${BASE_URL}/api/admin/branchDetailData?id=${id}`)
      .then((res) => {
        const _data = res.data
        setData(res.data)
        setDataItems([
          { name: 'Mã chi nhánh', content: _data.id },
          { name: 'Địa chỉ', content: _data.address },
          { name: 'Quản lý', content: _data.manager },
          { name: 'Diện tích', content: _data.area },
          { name: 'Nhân viên', content: _data.staff },
          {
            name: 'Giờ hoạt động',
            content:
              formatTime(new Date(_data.startTime)) +
              ' - ' +
              formatTime(new Date(_data.endTime)),
          },
        ])
        setLoading(false)
      })
  }

  const getStatisticData = async () => {
    await axios.get(`${BASE_URL}/api/admin/statisticData`).then((res) => {
      setStatisticData(res.data)
    })
  }

  useEffect(() => {
    getData()
    getStatisticData()
  }, [])

  const { showModelConfirm, contextModalComfirm } = useModalConfirm({
    title: 'Xóa chi nhánh',
    content: 'Bạn có chắc  chắn muốn xóa chi nhánh này?',
    onOk: () => {
      console.log('delete branch')
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
          <Col xs={24} sm={12}>
            <Image
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
                  iconInput={<EditFilled />}
                  onClick={() => setModalAddEditBranch(true)}
                />
              </Space>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card className='!max-w-full-lg'>
        <LineChart data={statisticData} haveRevenue={true} haveProfit={true} />
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
  )

  return <LayoutAdmin content={content} selected={0} />
}

BranchDetail.displayName = 'Branch Detail'

export default BranchDetail
